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
						if (req.body.remember_user != undefined) {
							res.cookie('userId', usuario.idUsuarios, {
								maxAge: 60000
							});
						}
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

	editar: async (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			if (req.file) {
				usersService.buscarUsuarioId(req.params.id).then((usuario) => {
					if (usuario.imagen != 'default.png') {
						fs.unlinkSync(
							__dirname + '/../../public/imagenes/users/' + usuario.imagen
						);
					}
				});
				await usersService.editarUsuarioConImagen(
					req.params.id,
					req.body,
					req.file.filename
				);
				req.session.userLogged.imagen = req.file.filename;
			} else {
				await usersService.editarUsuarioSinImagen(req.params.id, req.body);
			}
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
			if (req.file) {
				usersService.crearUsuarioConImagen(req.body, 0, req.file.filename);
			} else {
				usersService.crearUsuarioSinImagen(req.body, 0);
			}
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

	delete: async (req, res) => {
		await usersService.buscarUsuarioId(req.params.id).then((usuario) => {
			if (usuario.imagen != 'default.png') {
				fs.unlinkSync(
					__dirname + '/../../public/imagenes/users/' + usuario.imagen
				);
			}
		});
		usersService.borrarUsuario(req.params.id);
		res.clearCookie('userId');
		req.session.destroy();
		return res.redirect('/');
	},

	logout: (req, res) => {
		res.clearCookie('userId');
		req.session.destroy();
		return res.redirect('/');
	}
};

module.exports = usersController;
