const users = require('./../data/users.json');
const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');

const usersController = {
	login: (req, res) => {
		res.render('./users/login');
	},

	password: (req, res) => {
		res.render('./users/password');
	},

	perfil: (req, res) => {
		res.render('./users/perfil');
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
			password: '',
			address: req.body.direccion,
			country: req.body.pais,
			img: 'default.png',
			deleted: 0
		};
		users.push(newUser);
		fs.writeFileSync(
			path.join(__dirname, '/../data/users.json'),
			JSON.stringify(users, null, ' '),
			'utf-8'
		);
		res.redirect('/');
	}
};

module.exports = usersController;
