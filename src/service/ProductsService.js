const db = require('../database/models');

function buscarTodosProductos() {
	return db.Producto.findAll();
}

function crearProducto(datos, foto) {
	return db.Producto.create({
		nombre: datos.name.trim(),
		precio: parseInt(datos.price.trim()),
		descripcion: datos.description.trim(),
		especificacion: datos.specification.trim(),
		descuento: parseInt(datos.discount.trim()),
		cantidad: datos.cantidad.trim(),
		imagen: foto,
		talla: datos.talla.trim(),
		Categorias_idCategorias: datos.category,
		Tipos_idTipos: datos.type,
		Colores_idColores: datos.color
	});
}

function buscarProductoId(id) {
	return db.Producto.findOne({
		where: { idProductos: id },
		include: [
			{ association: 'categoria' },
			{ association: 'color' },
			{ association: 'tipo' }
		]
	});
}

function buscarProductoCategoria(nombreCategoria) {
	let id = verificarCategoria(nombreCategoria);
	return db.Producto.findAll({
		where: {
			Categorias_idCategorias: id
		}
	});
}

function verificarCategoria(nombreCategoria) {
	switch (nombreCategoria) {
		case 'tenis':
			return 1;
		case 'futbol':
			return 2;
		case 'basketball':
			return 3;
		case 'volleyball':
			return 4;
		case 'natacion':
			return 5;
		default:
			return 6;
	}
}

function borrarProducto(id) {
	return db.Producto.destroy({
		where: { idProductos: id }
	});
}

function editarProducto(id, datos, foto) {
	return db.Producto.update(
		{
			nombre: datos.name.trim(),
			precio: parseInt(datos.price.trim()),
			descripcion: datos.description.trim(),
			especificacion: datos.specification.trim(),
			descuento: parseInt(datos.discount.trim()),
			cantidad: datos.cantidad.trim(),
			imagen: foto,
			talla: datos.talla.trim(),
			Categorias_idCategorias: datos.category,
			Tipos_idTipos: datos.type,
			Colores_idColores: datos.color
		},
		{
			where: { idProductos: id }
		}
	);
}

exports = {
	buscarTodosProductos,
	crearProducto,
	buscarProductoId,
	buscarProductoCategoria,
	borrarProducto,
	editarProducto
};
