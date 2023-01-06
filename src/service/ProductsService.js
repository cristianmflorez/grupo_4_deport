const db = require('../database/models');
const Op = db.Sequelize.Op;

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

function editarProductoConImagen(id, datos, foto) {
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

function editarProductoSinImagen(id, datos) {
	return db.Producto.update(
		{
			nombre: datos.name.trim(),
			precio: parseInt(datos.price.trim()),
			descripcion: datos.description.trim(),
			especificacion: datos.specification.trim(),
			descuento: parseInt(datos.discount.trim()),
			cantidad: datos.cantidad.trim(),
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

function buscarProductoRandom(id1, id2, id3) {
	return db.Producto.findOne({
		where: {
			idProductos: {
				[Op.and]: [{ [Op.ne]: id1 }, { [Op.ne]: id2 }, { [Op.ne]: id3 }]
			}
		}
	});
}

function buscarProductoNombre(nombre) {
	return db.Producto.findAll({
		where: {
			nombre: { [Op.like]: '%' + nombre + '%' }
		}
	});
}

function editarProductoCantidad(id, dato) {
	return db.Producto.update(
		{
			cantidad: dato,
		},
		{
			where: { idProductos: id }
		}
	);
}

module.exports = {
	buscarTodosProductos,
	crearProducto,
	buscarProductoId,
	buscarProductoCategoria,
	borrarProducto,
	editarProductoConImagen,
	editarProductoSinImagen,
	buscarProductoRandom,
	buscarProductoNombre,
	editarProductoCantidad
};
