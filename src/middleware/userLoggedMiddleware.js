const usersService = require('../service/usersService');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	
	if (emailInCookie) {
		usersService.buscarUsuarioEmail(emailInCookie).then((usuario) => {
			if (usuario) {
				req.session.userLogged = usuario;
			}
		});
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;
