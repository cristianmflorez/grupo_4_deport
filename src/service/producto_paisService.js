const db = require('../database/models');

const producto_pais = {
	crear: (producto, pais) => {
		db.Producto_Pais.create({
			Productos_idProductos: producto.idProductos,
			Paises_idPaises: pais
		});
	}
};

module.exports = producto_pais;
