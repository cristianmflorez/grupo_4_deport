//controller con . al inicio de la dirección, en html sin .

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
	}
};

module.exports = usersController;
