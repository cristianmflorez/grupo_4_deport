const db = require('../database/models');

const productService = {
	crearProducto: async (datos) => {
		db.Producto.Create({
			nombre: datos.name.trim(),
			precio: parseInt(datos.price.trim()),
			descripcion: datos.description.trim(),
			especificacion: datos.specifications.trim(),
			descuento: parseInt(datos.discount.trim()),
			cantidad: datos.cantidad.trim(),
			talla: datos.talla.trim(),
			Categorias_idCategorias: datos.categoria,
			Tipos_idTipos: datos.tipo,
			Colores_idColores: datos.color
		});
	},
	buscarProductoId: (id) => {
		db.Producto.FindByPk(id).then((producto) => {
			return producto;
		});
	},
	buscarProductoCategoria: (categoria) => {
		db.Producto.findAll({
			include: [{ association: 'categoria' }, { association: 'imagen' }],
			where: {
				Categorias_idCategorias: categoria
			}
		}).then((productos) => {
			return productos;
		});
	},
	borrarProducto: (id) => {
		db.Producto.destroy({
			where: { idProductos: id }
		});
	},
	buscarImagenProducto: (id) => {
		db.Producto.findAll({
			where: { idProductos: id },
			include: [{ association: imagen }]
		}).then((producto) => {
			return producto.imagen.nombre;
		});
	},
	editarProducto: (id, datos) => {
		db.Producto.Create(
			{
				nombre: datos.name.trim(),
				precio: parseInt(datos.price.trim()),
				descripcion: datos.description.trim(),
				especificacion: datos.specifications.trim(),
				descuento: parseInt(datos.discount.trim()),
				cantidad: datos.cantidad.trim(),
				talla: datos.talla.trim(),
				Categorias_idCategorias: datos.categoria,
				Tipos_idTipos: datos.tipo,
				Colores_idColores: datos.color
			},
			{
				where: { idProductos: id }
			}
		);
	}
};
module.exports = productService;
