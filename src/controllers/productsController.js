const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsJSON.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const db = require('../database/models');
const productsService = require('../service/productsService');

const productsController = {
	creacionProducto: (req, res) => {
		res.render('./products/creacionProducto');

		// let tablas = productsService.llamarOtrasTablasRelacionada();
		// res.render('./products/creacionProducto', {
		// 	paises: tablas[0],
		// 	colores: tablas[1],
		// 	categorias: tablas[2],
		// 	tipos: tablas[3]
		// });
	},

	crear: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			//TODO: Quitar codigo al subir registros al servidor
			let datos = req.body;
			let nuevoProducto = {
				id: products[products.length - 1].id + 1,
				name: datos.name.trim(),
				description: datos.description.trim(),
				specifications: [
					datos.material.trim(),
					datos.weight.trim(),
					datos.origin.trim()
				],
				price: parseInt(datos.price.trim()),
				discount: parseInt(datos.discount.trim()),
				image: req.file.filename,
				category: datos.category,
				color: datos.color.trim(),
				type: datos.type,
				pais: datos.pais
			};
			products.push(nuevoProducto);
			fs.writeFileSync(
				productsFilePath,
				JSON.stringify(products, null, ' '),
				'utf-8'
			);
			res.redirect(`/products/detalle/${nuevoProducto.id}`);
			//TODO

			// productsService.crearProducto(req.body, req.file.filename).then(res.redirect('/'));
		} else {
			res.render('./products/creacionProducto', {
				errors: errors.mapped(),
				oldData: req.body
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

		//TODO: Quitar codigo al subir registros al servidor
		let idProducto = req.params.id;
		let productoBuscado = null;
		for (let o of products) {
			if (o.id == idProducto) {
				productoBuscado = o;
				break;
			}
		}
		if (productoBuscado != null) {
			res.render('./products/detalle', {
				producto: productoBuscado,
				random1: rValue1,
				random2: rValue2,
				random3: rValue3
			});
		}
		res.send('Producto no encontrado');
		//TODO

		// productsService.buscarProductoId(req.params.id).then((producto) => {
		// 	res.render('./products/detalle', {
		// 		producto: producto,
		// 		random1: rValue1,
		// 		random2: rValue2,
		// 		random3: rValue3
		// 	});
		// });
	},

	edicionProducto: (req, res) => {
		//TODO: Quitar codigo al subir registros al servidor
		let idProducto = req.params.id;
		let productobuscado = null;
		for (let p of products) {
			if (p.id == idProducto) {
				productobuscado = p;
				break;
			}
		}
		if (productobuscado != null) {
			res.render('./products/edicionProducto', { producto: productobuscado });
		}
		//TODO

		// productsService.buscarProductoId(req.params.id)
		// 	.then((producto) => {
		// 		res.render('./products/edicionProducto', { producto });
		// 	});
	},

	editar: (req, res) => {
		let idProducto = req.params.id;
		let datos = req.body;
		let imagenAntigua;
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			//TODO: Quitar codigo al subir registros al servidor
			for (let p of products) {
				if (p.id == idProducto) {
					imagenAntigua = p.image;
					(p.name = datos.name.trim()),
						(p.description = datos.description.trim()),
						(p.specifications[0] = datos.material.trim()),
						(p.specifications[1] = datos.weight.trim()),
						(p.specifications[2] = datos.origin.trim()),
						(p.price = parseInt(datos.price.trim())),
						(p.discount = parseInt(datos.discount.trim())),
						(p.category = datos.category),
						(p.color = datos.color.trim()),
						(p.type = datos.type),
						(p.pais = datos.pais),
						//Operador ternario para editar sin necesidad de imagen
						(p.image = req.file ? req.file.filename : p.image),
						//deleted sigue igual
						fs.writeFileSync(
							productsFilePath,
							JSON.stringify(products, null, ' '),
							'utf-8'
						);
					//para eliminar imagen antigua
					if (imagenAntigua != p.image) {
						fs.unlinkSync(
							__dirname + '/../../public/imagenes/products/' + imagenAntigua
						);
					}
					res.redirect(`/products/detalle/${idProducto}`);
					break;
				}
			}
			//TODO

			// fs.unlinkSync(
			// 	__dirname +
			// 		'/../../public/imagenes/products/' +
			// 		productsService.buscarImagenProducto(req.params.id)
			// );
			// productsService.editarProducto(req.params.id, req.body, req.body.imagen);
			// res.redirect('/');
		} else {
			res.render('./products/edicionProducto', {
				errors: errors.mapped(),
				oldData: req.body,
				producto: products[idProducto - 1]
			});
		}
	},

	listadoProductos: (req, res) => {
		//TODO: Quitar codigo al subir registros al servidor
		let deporteIngresado = req.params.categoria;
		let categoriaParaLaVista = {};
		db.Categoria.findOne({
			where: {
				nombre: deporteIngresado
			}
		})
			.then((categoria) => {
				categoriaParaLaVista = categoria;
				return res.send(categoriaParaLaVista);
			})
			.catch((error) => {
				return res.send(error);
			});
		//TODO

		// productsService.buscarProductoCategoria(req.params.categoria)
		// 	.then( (productos) => {
		// 		res.render('./products/listadoProductos', {productos});
		// 	})
	},

	delete: (req, res) => {
		//TODO: Quitar codigo al subir registros al servidor
		let idProduct = req.params.id;
		let deleteImg = '';
		let newProducts = [];
		for (let p of products) {
			if (p.id == idProduct) {
				deleteImg = p.image;
				break;
			}
		}
		newProducts = products.filter((p) => p.id != idProduct);
		fs.writeFileSync(
			path.join(__dirname, '/../data/productsJSON.json'),
			JSON.stringify(newProducts, null, ' '),
			'utf-8'
		);
		fs.unlinkSync(__dirname + '/../../public/imagenes/products/' + deleteImg);
		res.redirect('/');
		//TODO

		// let imagenVieja = productsService.buscarImagenProducto(req.params.id);
		// fs.unlinkSync(__dirname + '/../../public/imagenes/products/' + imagenVieja);
		// setTimeout(() => {
		// 	productsService.borrarProducto(req.params.id);
		// }, '1000');
		// res.redirect('/');
	}
};

module.exports = productsController;
