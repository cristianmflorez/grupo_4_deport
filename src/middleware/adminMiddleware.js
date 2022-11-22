function AdminMiddleware(req, res, next) {
	if (req.session.userLogged == null || req.session.userLogged.admin == 0) {
		return res.redirect('../../');
	}
	next();
}

module.exports = AdminMiddleware;