const db = require('../database/models');

function obtenerTablaTipo() {
	return db.Tipo.findAll();
};

module.exports = obtenerTablaTipo;