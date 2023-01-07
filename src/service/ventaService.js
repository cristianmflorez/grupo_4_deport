const db = require('../database/models');

function crearVenta(cantidad, producto, usuario, detalleVenta) {
	return db.Venta.create({
		cantidad: cantidad,
		Productos_idProductos: producto,
		Usuarios_idUsuarios: usuario,
		DetallesVenta_idDetallesVenta: detalleVenta
	});
}

function buscarVentasDetalleVenta(detalleVenta) {
	return db.Venta.findAll({
        where:{
            DetallesVenta_idDetallesVenta: detalleVenta
        }
    });
}

module.exports = { crearVenta, buscarVentasDetalleVenta };
