const db = require('../database/models');

async function ObtenerTablaPais() {
	db.Pais.findAll();
}

module.exports.ObtenerTablaPais = ObtenerTablaPais;
