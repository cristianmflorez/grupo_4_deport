const db = require('../database/models');

function crearDetalleVenta(fecha, monto) {
	return db.DetalleVenta.create({
		fecha: fecha,
		monto: monto
	});
}

function buscarTodoDetalleVenta() {
	return db.DetalleVenta.findAll();
}

module.exports = { crearDetalleVenta, buscarTodoDetalleVenta };
