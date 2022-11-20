const db = require('../database/models');

function obtenerTablaCategoria() {
	return db.Categoria.findAll();
};

module.exports = obtenerTablaCategoria;