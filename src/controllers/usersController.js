const fs = require('fs');
const bcryptjs = require('bcryptjs');
const obtenerTablaPais = require('../service/paisService');

const { validationResult } = require('express-validator');
const usersService = require('../service/usersService');

const usersController = {
	login: (req, res) => {
		res.render('./users/login');
	},

	loginProcess: (req, res) => {
		let userToLogin = usersService.buscarUsuarioEmail(req.body.correo.trim());
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			userToLogin.then((usuario) => {
				if (usuario) {
					let isOkThePassword = bcryptjs.compareSync(
						req.body.password.trim(),
						usuario.password
					);
					if (isOkThePassword) {
						delete usuario.password;
						req.session.userLogged = usuario;

						return res.redirect('/');
					} else {
						return res.render('./users/login', {
							errors: {
								password: {
									msg: 'Credenciales inválidas'
								}
							},
							oldData: req.body
						});
					}
				} else {
					res.render('./users/login', {
						errors: errors.mapped(),
						oldData: req.body
					});
				}
			});
		} else {
			res.render('./users/login', {
				errors: errors.mapped(),
				oldData: req.body
			});
		}
	},

	perfil: (req, res) => {
		obtenerTablaPais().then((paises) => {
			res.render('./users/perfil', { paises });
		});
	},

	editar: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			usersService.buscarUsuarioId(req.params.id).then((usuario) => {
				if (usuario.imagen != 'default.png') {
					fs.unlinkSync(
						__dirname + '/../../public/imagenes/users/' + usuario.imagen
					);
				}
			});
			usersService
				.editarUsuario(req.params.id, req.body, req.file.filename)
				.then((usuario) => {
					req.session.userLogged.imagen = usuario.imagen;
				});
			res.redirect('/');
		} else {
			obtenerTablaPais().then((paises) => {
				res.render('./users/perfil', {
					paises,
					errors: errors.mapped(),
					oldData: req.body
				});
			});
		}
	},

	registro: (req, res) => {
		obtenerTablaPais().then((paises) => {
			res.render('./users/registro', { paises });
		});
	},

	crear: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			usersService.crearUsuario(req.body, 0);
			res.redirect('/');
		} else {
			obtenerTablaPais().then((paises) => {
				res.render('./users/registro', {
					paises,
					errors: errors.mapped(),
					oldData: req.body
				});
			});
		}
	},

	delete: (req, res) => {
		usersService.buscarUsuarioId(req.params.id).then((usuario) => {
			if (usuario.imagen != 'default.png') {
				fs.unlinkSync(
					__dirname + '/../../public/imagenes/users/' + usuario.imagen
				);
			}
		});
		setTimeout(() => {
			usersService.borrarUsuario(req.params.id);
		}, '1000');
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
};

module.exports = usersController;
