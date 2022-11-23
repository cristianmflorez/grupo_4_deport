const usersService = require('../service/usersService');

async function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let idInCookie = req.cookies.userId;
	
	if (idInCookie && req.session.userLogged == undefined) {
		await usersService.buscarUsuarioId(idInCookie).then((usuario) => {
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
