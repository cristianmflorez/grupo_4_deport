const db = require('../database/models');

function obtenerTablaPais() {
	return db.Pais.findAll();
};

module.exports = obtenerTablaPais;