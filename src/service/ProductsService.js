const db = require('../database/models');
const categorias = require('../service/categoriaService');
const paises = require('../service/paisService');
const tipos = require('../service/tipoService');
const colores = require('../service/colorService');
const productos_paises = require('../service/producto_paisService');

const productService = {
	crearProducto: async (datos, foto) => {
		db.Producto.create({
			nombre: datos.name.trim(),
			precio: parseInt(datos.price.trim()),
			descripcion: datos.description.trim(),
			especificacion: datos.specification.trim(),
			descuento: parseInt(datos.discount.trim()),
			cantidad: datos.cantidad.trim(),
			imagen: foto,
			talla: datos.talla.trim(),
			Categorias_idCategorias: datos.categoria,
			Tipos_idTipos: datos.tipo,
			Colores_idColores: datos.color
		}).then((producto) => {
			productos_paises.crear(producto, datos.pais);
		});
	},
	buscarProductoId: (id) => {
		db.Producto.findByPk(id).then((producto) => {
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
			where: { idProductos: id }
		}).then((producto) => {
			return producto.imagen;
		});
	},
	editarProducto: (id, datos, foto) => {
		db.Producto.update(
			{
				nombre: datos.name.trim(),
				precio: parseInt(datos.price.trim()),
				descripcion: datos.description.trim(),
				especificacion: datos.specifications.trim(),
				descuento: parseInt(datos.discount.trim()),
				cantidad: datos.cantidad.trim(),
				talla: datos.talla.trim(),
				imagen: foto,
				Categorias_idCategorias: datos.categoria,
				Tipos_idTipos: datos.tipo,
				Colores_idColores: datos.color
			},
			{
				where: { idProductos: id }
			}
		).then((producto) => {
			productos_paises.crear(producto, datos.pais);
		});
	},
	llamarOtrasTablasRelacionada: () => {
		const paises = paises.llamarTabla;
		const colores = colores.llamarTabla;
		const categorias = categorias.llamarTabla;
		const tipos = tipos.llamarTabla;

		Promise.all([paises, colores, categorias, tipos]).then(() => {
			return [paises, colores, categorias, tipos];
		});
	}
};
module.exports = productService;
