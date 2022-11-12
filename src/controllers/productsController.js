const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsJSON.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const db = require('../database/models');

const productsController = {
	creacionProducto: (req, res) => {
		res.render('./products/creacionProducto');
	},

	crear: (req, res) => {
		let errors = validationResult(req);
		if(errors.isEmpty()){ 
			let datos = req.body;
			let nuevoProducto = {
				id: products[products.length - 1].id + 1,
				name: datos.name.trim(),
				description: datos.description.trim(),
				specifications: [datos.material.trim(), datos.weight.trim(), datos.origin.trim()],
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
		} else{
			res.render('./products/creacionProducto', {errors: errors.mapped(), oldData: req.body});
		}
	},

	detalle: (req, res) => {
		//res.send(JSON.stringify(products)); para tener en cuenta por si luego queremos ver el JSON que está en el Heroku

		let rand1 = Math.floor(Math.random() * products.length);
		let rValue1 = products[rand1];
		let rand2 = Math.floor(Math.random() * products.length);
		let rValue2 = products[rand2];
		let rand3 = Math.floor(Math.random() * products.length);
		let rValue3 = products[rand3];
		// console.log(rValue)

		// let bandera = true;
		// while(bandera){
		// 	let random = [];
		// 	random[0] = Math.floor(Math.random()*products.length);
		// 	random[1] = Math.floor(Math.random()*products.length);
		// 	random[2] = Math.floor(Math.random()*products.length);
		// 	if(random[0] != random[1] != random[2]){
		// 		bandera = false;
		// 		return random;
		// 	}
		// }

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
	},

	edicionProducto: (req, res) => {
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
	},

	editar: (req, res) => {
		let idProducto = req.params.id;
		let datos = req.body;
		let imagenAntigua;
		let errors = validationResult(req);
		if(errors.isEmpty()){ 
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
						fs.unlinkSync(__dirname + '/../../public/imagenes/products/' + imagenAntigua);
					}

					res.redirect(`/products/detalle/${idProducto}`);

					break;
				}
			}
		}else{
			res.render('./products/edicionProducto', {errors: errors.mapped(), oldData: req.body, producto: products[idProducto-1] });
		}
	},

	listadoProductos: (req, res) => { //Este es con el archivo JSON
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let deporteIngresado = req.params.categoria;
		let paraLaVista = products.filter(
			(elemento) => elemento.category == deporteIngresado
		);
		res.render('./products/listadoProductos', { productos: paraLaVista });
	},

	// listadoProductos: (req, res) => { //DSC: Este es con la DB, no lo he terminado.
	// 	let deporteIngresado = req.params.categoria;

	// 	db.categorias.findAll().then((categorias) => {
	// 		let categoriasDisponibles = [];
	// 		//console.log(categorias);
	// 		for(c of categorias){
	// 			categoriasDisponibles.push(c.nombre);
	// 		}
	// 	});

	// 	db.productos.findAll().then((productos) => {
	// 		let paraLaVista = [];
	// 		//console.log(productos);
	// 		for(let i=0; i<productos.length; i++){
	// 			if(productos[i].Categorias_idCategorias == )

	// 		}
	// 		for(p of productos){
	// 			if(p.Categorias_idCategorias == )
	// 			paraLaVista.push(p.nombre);
	// 		}
	// 		res.render('./products/listadoProductos', {productos: paraLaVista}); //DSC: FALTA ACTUALIZAR LA VISTA PARA QUE LOS names COINCIDAN CON LOS QUE TIENE LA TABLA EN LA BASE DE DATOS
	// 	});
	// },

	delete: (req, res) => {
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
	}
};

module.exports = productsController;
