const db = require('../database/models');

function crearProductoPais(idProducto, idPais) {
	return db.Producto_Pais.create({
		Productos_idProductos: idProducto,
		Paises_idPaises: idPais
	});
}

function editarProductoPais(idProducto, idPais) {
	return db.Producto_Pais.update(
		{
			Paises_idPaises: idPais
		},
		{
			where: { Productos_idProductos: idProducto }
		}
	);
}

function verificarRelacionProductoPais(idProducto) {
	return db.Producto_Pais.findAll({
		where: { Productos_idProductos: idProducto }
	});
}

function eliminarRelacionProductoPais(idProducto) {
	return db.Producto_Pais.destroy({
		where: { Productos_idProductos: idProducto }
	});
}

module.exports = {
	crearProductoPais,
	editarProductoPais,
	verificarRelacionProductoPais,
	eliminarRelacionProductoPais
};
