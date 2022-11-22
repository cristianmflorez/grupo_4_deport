const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsJSON.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

const productsService = require('../service/productsService');
const producto_paisService = require('../service/producto_paisService');
const obtenerTablaPais = require('../service/paisService');
const obtenerTablaTipo = require('../service/tipoService');
const obtenerTablaColor = require('../service/colorService');
const obtenerTablaCategoria = require('../service/categoriaService');

const productsController = {
	creacionProducto: (req, res) => {
		let paises = obtenerTablaPais();
		let colores = obtenerTablaColor();
		let categorias = obtenerTablaCategoria();
		let tipos = obtenerTablaTipo();

		Promise.all([paises, colores, categorias, tipos]).then(function ([
			rPaises,
			rColores,
			rCategorias,
			rTipos
		]) {
			res.render('./products/creacionProducto', {
				paises: rPaises,
				colores: rColores,
				categorias: rCategorias,
				tipos: rTipos
			});
		});
	},

	crear: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			productsService
				.crearProducto(req.body, req.file.filename)
				.then((ultimoProducto) => {
					producto_paisService.crearProductoPais(
						ultimoProducto.idProductos,
						req.body.pais
					);
				});
			res.redirect('/');
		} else {
			let paises = obtenerTablaPais();
			let colores = obtenerTablaColor();
			let categorias = obtenerTablaCategoria();
			let tipos = obtenerTablaTipo();

			Promise.all([paises, colores, categorias, tipos]).then(function ([
				rPaises,
				rColores,
				rCategorias,
				rTipos
			]) {
				res.render('./products/creacionProducto', {
					paises: rPaises,
					colores: rColores,
					categorias: rCategorias,
					tipos: rTipos,
					errors: errors.mapped(),
					oldData: req.body
				});
			});
		}
	},

	detalle: (req, res) => {
		let rand1 = Math.floor(Math.random() * products.length);
		let rValue1 = products[rand1];
		let rand2 = Math.floor(Math.random() * products.length);
		let rValue2 = products[rand2];
		let rand3 = Math.floor(Math.random() * products.length);
		let rValue3 = products[rand3];

		productsService.buscarProductoId(req.params.id).then((producto) => {
			res.render('./products/detalle', {
				producto: producto,
				random1: rValue1,
				random2: rValue2,
				random3: rValue3
			});
		});
	},

	edicionProducto: (req, res) => {
		let productoEditar = productsService.buscarProductoId(req.params.id);
		let relacionProductoPais =
			producto_paisService.verificarRelacionProductoPais(req.params.id);
		let paises = obtenerTablaPais();
		let colores = obtenerTablaColor();
		let categorias = obtenerTablaCategoria();
		let tipos = obtenerTablaTipo();

		Promise.all([
			productoEditar,
			relacionProductoPais,
			paises,
			colores,
			categorias,
			tipos
		]).then(function ([
			rproductoEditar,
			rRelacionProductoPais,
			rPaises,
			rColores,
			rCategorias,
			rTipos
		]) {
			res.render('./products/edicionProducto', {
				producto: rproductoEditar,
				paises: rPaises,
				colores: rColores,
				categorias: rCategorias,
				tipos: rTipos,
				relacionProductoPais: rRelacionProductoPais
			});
		});
	},

	editar: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			productsService.buscarProductoId(req.params.id).then((producto) => {
				fs.unlinkSync(
					__dirname + '/../../public/imagenes/products/' + producto.imagen
				);
			});
			productsService.editarProducto(req.params.id, req.body, req.body.imagen);
			producto_paisService.editarProductoPais(req.params.id, req.body.pais);
			res.redirect('/');
		} else {
			let productoEditar = productsService.buscarProductoId(req.params.id);
			let paises = obtenerTablaPais();
			let colores = obtenerTablaColor();
			let categorias = obtenerTablaCategoria();
			let tipos = obtenerTablaTipo();

			Promise.all([productoEditar, paises, colores, categorias, tipos]).then(
				function ([rProductoEditar, rPaises, rColores, rCategorias, rTipos]) {
					res.render('./products/creacionProducto', {
						producto: rProductoEditar,
						paises: rPaises,
						colores: rColores,
						categorias: rCategorias,
						tipos: rTipos,
						errors: errors.mapped(),
						oldData: req.body
					});
				}
			);
		}
	},

	listadoProductos: (req, res) => {
		let listado = productsService.buscarProductoCategoria(req.params.categoria);
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
				nombreCategoria: req.params.categoria,
				paises: rPaises,
				colores: rColores,
				tipos: rTipos
			});
		});
	},

	delete: (req, res) => {
		producto_paisService.eliminarRelacionProductoPais(req.params.id);
		setTimeout(() => {
			productsService.buscarProductoId(req.params.id).then((producto) => {
				fs.unlinkSync(
					__dirname + '/../../public/imagenes/products/' + producto.imagen
				);
			});
		}, '1000');
		setTimeout(() => {
			productsService.borrarProducto(req.params.id);
		}, '1000');
		res.redirect('/');
	}
};

module.exports = productsController;
