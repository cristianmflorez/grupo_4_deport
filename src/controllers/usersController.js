const users = require('./../data/users.json');
const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');

//importar modelo usuarios
const User = require('../../models/User');
const { localsName } = require('ejs');

const usersController = {
	login: (req, res) => {
		res.render('./users/login');
	},

	//----AÑADÍ NAME A CAMPOS CORREO Y CONTRASEÑA DEL HTML LOGIN ()
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.correo);

		if (userToLogin) {
			/*-----cuando esté hasheado el password
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				return res.redirect('/users/perfil');
			} 
			-------------------*/

			//para borrar cuando esté hasheado
			if (req.body.password === userToLogin.password) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				return res.redirect('/users/perfil');
			}
			//---------------------------------

			//si la contraseña es incorrecta - COMPLEMENTAR CON VALIDACIONES
			return res.render('./users/login');
		}

		//si el correo es incorrecto - COMPLEMENTAR CON VALIDACIONES
		return res.render('./users/login');
	},

	perfil: (req, res) => {
		res.render('./users/perfil');
	},

	editar: (req, res) => {
		for (const u of users) {
			if (u.id == req.params.id) {
				u.name = req.body.nombre;
				u.email = req.body.correo;
				u.tel = req.body.telefono;
				u.address = req.body.direccion;
				u.country = req.body.pais;
				break;
			}
		}
		fs.writeFileSync(
			path.join(__dirname, './../data/users.json'),
			JSON.stringify(users, null, ' '),
			'utf-8'
		);

		res.redirect('/users/perfil');
	},

	registro: (req, res) => {
		res.render('./users/registro');
	},

	crear: (req, res) => {
		let newUser = {
			id: users[users.length - 1].id + 1,
			email: req.body.correo,
			name: req.body.nombre,
			tel: req.body.telefono,
			password: bcryptjs.hashSync(req.body.password, 12),
			address: req.body.direccion,
			country: req.body.pais,
			img: 'default.png',

			//Campo para definir si es admin o no
			admin: 0
		};
		users.push(newUser);
		fs.writeFileSync(
			path.join(__dirname, '/../data/users.json'),
			JSON.stringify(users, null, ' '),
			'utf-8'
		);
		res.redirect('/');
	},

	delete: (req, res) => {
		let idUser = req.params.id;
		let newUsers = users.filter((u) => u.id != idUser);
		let deleteImg = '';
		for (u in users) {
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
		res.redirect('/');
	},

	logout: (req, res) => {
		req.session.destroy();
		return res.redirect('/');
	}
};

module.exports = usersController;
