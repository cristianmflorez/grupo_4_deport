const productsService = require('../service/ProductsService');
const obtenerTablaPais = require('../service/paisService');
const obtenerTablaTipo = require('../service/tipoService');
const obtenerTablaColor = require('../service/colorService');

const mainController = {
	home: (req, res) => {
		productsService.buscarTodosProductos().then((productos) => {
			res.render('home', { products: productos });
		});
	},

	carrito: (req, res) => {
		res.render('carrito');
	},

	buscar: (req, res) => {
		let listado = productsService.buscarProductoNombre(req.query.producto);
		let paises = obtenerTablaPais();
		let colores = obtenerTablaColor();
		let tipos = obtenerTablaTipo();

		Promise.all([listado, paises, colores, tipos]).then(function ([
			rListado,
			rPaises,
			rColores,
			rTipos
		]) {
			res.render('./products/listadoProductos', {
				productos: rListado,
				nombreCategoria: "Resultado de la busqueda",
				paises: rPaises,
				colores: rColores,
				tipos: rTipos
			});
		});
	}
};

module.exports = mainController;
