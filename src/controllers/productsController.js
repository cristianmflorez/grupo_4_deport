const fs = require('fs');
const { validationResult } = require('express-validator');

const productsService = require('../service/ProductsService.js');
const producto_paisService = require('../service/producto_paisService');
const obtenerTablaPais = require('../service/paisService');
const obtenerTablaTipo = require('../service/tipoService');
const obtenerTablaColor = require('../service/colorService');
const obtenerTablaCategoria = require('../service/categoriaService');
const obtenerTablaFavorito = require('../service/favoritoService');

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

	crear: async (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			await productsService
				.crearProducto(req.body, req.file.filename)
				.then((ultimoProducto) => {
					for (let index = 0; index < req.body.pais.length; index++) {
						producto_paisService.crearProductoPais(
							ultimoProducto.idProductos,
							req.body.pais[index]
						);
					}
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

	detalle: async (req, res) => {
		let idProducto = req.params.id;
		let listadoProductos = await productsService.buscarTodosProductos();
		let producto = await productsService.buscarProductoId(idProducto);
		let relacionProductoPais =
			await producto_paisService.verificarRelacionProductoPais(idProducto);
		let favorito = await obtenerTablaFavorito(idProducto);
		let rValue1;
		let rValue2;
		let rValue3;
		if (listadoProductos.length > 3) {
			rValue1 = await productsService.buscarProductoRandom(
				idProducto,
				idProducto,
				idProducto
			);
			rValue2 = await productsService.buscarProductoRandom(
				idProducto,
				rValue1.idProductos,
				idProducto
			);
			rValue3 = await productsService.buscarProductoRandom(
				idProducto,
				rValue1.idProductos,
				rValue2.idProductos
			);
		}

		res.render('./products/detalle', {
			producto: producto,
			relacionProductoPais: relacionProductoPais,
			favorito: favorito,
			random1: rValue1,
			random2: rValue2,
			random3: rValue3
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

	editar: async (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			if (req.file) {
				await productsService
					.buscarProductoId(req.params.id)
					.then((producto) => {
						fs.unlinkSync(
							__dirname + '/../../public/imagenes/products/' + producto.imagen
						);
					});
				await productsService.editarProductoConImagen(
					req.params.id,
					req.body,
					req.file.filename
				);
			} else {
				productsService.editarProductoSinImagen(req.params.id, req.body);
			}

			producto_paisService.eliminarRelacionProductoPais(req.params.id);

			for (let index = 0; index < req.body.pais.length; index++) {
				producto_paisService.crearProductoPais(
					req.params.id,
					req.body.pais[index]
				);
			}

			res.redirect('/');
		} else {
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
					relacionProductoPais: rRelacionProductoPais,
					errors: errors.mapped(),
					oldData: req.body
				});
			});
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

	delete: async (req, res) => {
		await producto_paisService.eliminarRelacionProductoPais(req.params.id);
		await productsService.buscarProductoId(req.params.id).then((producto) => {
			fs.unlinkSync(
				__dirname + '/../../public/imagenes/products/' + producto.imagen
			);
		});
		await productsService.borrarProducto(req.params.id);
		res.redirect('/');
	}
};

module.exports = productsController;
