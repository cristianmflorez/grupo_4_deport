const db = require('../database/models');

function obtenerTablaColor() {
	return db.Color.findAll();
};

module.exports = obtenerTablaColor;