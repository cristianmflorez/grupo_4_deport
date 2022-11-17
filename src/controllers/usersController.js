const users = require('./../data/users.json');
const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');

//importar modelo usuarios
const User = require('../../models/User');
const { localsName } = require('ejs');

const { validationResult } = require('express-validator');
const usersService = require('../service/usersService');
const paisService = require('../service/paisService');

const usersController = {
	login: (req, res) => {
		res.render('./users/login');
	},

	loginProcess: (req, res) => {
		//TODO: Quitar codigo al subir registros al servidor
		let userToLogin = User.findByField('email', req.body.correo.trim());
		//TODO

		// let userToLogin = usersService.buscarUsuarioEmail(req.body.correo.trim());
		
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			if (userToLogin) {
				//TODO: Quitar codigo al subir registros al servidor
				if (userToLogin.email === users[0].email) {
					if (req.body.password.trim() === userToLogin.password) {
						delete userToLogin.password;
						req.session.userLogged = userToLogin;

						return res.redirect('/users/perfil');
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
				//TODO

					let isOkThePassword = bcryptjs.compareSync(
						req.body.password.trim(),
						userToLogin.password
					);
					if (isOkThePassword) {
						delete userToLogin.password;
						req.session.userLogged = userToLogin;

						return res.redirect('/users/perfil');
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
				}
			} else {
				res.render('./users/login', {
					errors: errors.mapped(),
					oldData: req.body
				});
			}
		} else {
			res.render('./users/login', {
				errors: errors.mapped(),
				oldData: req.body
			});
		}
	},

	perfil: (req, res) => {
		res.render('./users/perfil');
	},

	editar: (req, res) => {
		let errors = validationResult(req);

		//TODO: Quitar codigo al subir registros al servidor
		let imagenAntigua;
		let idUser = req.params.id;
		//TODO

		if (errors.isEmpty()) {
			//TODO: Quitar codigo al subir registros al servidor
			for (const u of users) {
				if (u.id == idUser) {
					imagenAntigua = u.img;
					u.name = req.body.nombre.trim();
					u.email = req.body.correo.trim();
					u.tel = req.body.telefono.trim();
					u.address = req.body.direccion.trim();
					u.country = req.body.pais.trim();
					u.img = req.file ? req.file.filename : u.img;
					break;
				}
			}
			fs.writeFileSync(
				path.join(__dirname, './../data/users.json'),
				JSON.stringify(users, null, ' '),
				'utf-8'
			);
			if (imagenAntigua && imagenAntigua != 'default.png') {
				fs.unlinkSync(
					__dirname + '/../../public/imagenes/users/' + imagenAntigua
				);
			}
			req.session.userLogged = User.findByPk(idUser);
			//TODO

			// fs.unlinkSync(
			// 	__dirname +
			// 		'/../../public/imagenes/products/' +
			// 		usersService.buscarImagenUsuario(req.params.id)
			// );
			// usersService.editarUsuario(req.params.id, req.body, req.body.imagen);
			res.redirect('/');
		} else {
			res.render('./users/perfil', {
				errors: errors.mapped(),
				oldData: req.body
			});
		}
	},

	registro: (req, res) => {
		res.render('./users/registro');

		// paisService.llamarTabla.then((paises) =>{
		// 	res.render('./users/registro', {paises});
		// })
	},

	crear: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {

			//TODO: Quitar codigo al subir registros al servidor
			let newUser = {
				id: users[users.length - 1].id + 1,
				email: req.body.correo.trim(),
				name: req.body.nombre.trim(),
				tel: req.body.telefono.trim(),
				password: bcryptjs.hashSync(req.body.password.trim(), 12),
				address: req.body.direccion.trim(),
				country: req.body.pais.trim(),
				img: req.file ? req.file.filename : 'default.png',
				admin: 0
			};
			users.push(newUser);
			fs.writeFileSync(
				path.join(__dirname, '/../data/users.json'),
				JSON.stringify(users, null, ' '),
				'utf-8'
			);
			//TODO

			// usersService.crearUsuario(req.body, req.file.filename, 0);
			res.redirect('/');
		} else {
			res.render('./users/registro', {
				errors: errors.mapped(),
				oldData: req.body
			});
		}
	},

	delete: (req, res) => {

		//TODO: Quitar codigo al subir registros al servidor
		let idUser = req.params.id;
		let newUsers = users.filter((u) => u.id != idUser);
		let deleteImg = '';
		for (let u of users) {
			if (u.id == idUser && u.img != 'default.png') {
				deleteImg = u.img;
				break;
			}
		}
		fs.writeFileSync(
			path.join(__dirname, '/../data/users.json'),
			JSON.stringify(newUsers, null, ' '),
			'utf-8'
		);
		if (deleteImg != '') {
			fs.unlinkSync(__dirname + '/../../public/imagenes/users/' + deleteImg);
		}
		//TODO

		// let imagenVieja = usersService.buscarImagenUsuario(req.params.id);
		// fs.unlinkSync(__dirname + '/../../public/imagenes/users/' + imagenVieja);
		// setTimeout(() => {
		// 	usersService.borrarUsuario(req.params.id);
		// }, '1000');
		res.redirect('/');
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
};

module.exports = usersController;
