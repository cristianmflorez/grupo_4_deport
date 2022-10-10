const path = require('path');
const fs = require('fs');
const { json } = require('express');

const productsFilePath = path.join(__dirname, '../data/productsJSON.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
	creacionProducto: (req, res) => {
		res.render('./products/creacionProducto');
	},

	crear: (req,res) => {
		let datos = req.body;
		let nuevoProducto = {
			id:products[products.length-1].id+1,
    		name:datos.name,
   			description:datos.description,
    		specifications:[datos.material, datos.weight, datos.origin],
    		price:parseInt(datos.price),
   		 	discount:parseInt(datos.discount),
    		image:req.file.filename,
    		category:datos.category,
    		color:datos.color,
    		type:datos.type,
    		deleted:0

		};

		products.push(nuevoProducto);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "), 'utf-8');

		res.redirect(`/products/detalle/${nuevoProducto.id}`);
	},

	detalle: (req, res) => {

		//res.send(JSON.stringify(products)); para tener en cuenta por si luego queremos ver el JSON que está en el Heroku

		let rand1 = Math.floor(Math.random()*products.length);
		let rValue1 = products[rand1];
		let rand2 = Math.floor(Math.random()*products.length);
		let rValue2 = products[rand2];
		let rand3 = Math.floor(Math.random()*products.length);
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
		let productoBuscado=null;

		for (let o of products){
			if (o.id == idProducto){
				productoBuscado = o;
				break;
			}
		}
		if (productoBuscado!=null){
			res.render('./products/detalle', {producto: productoBuscado, random1: rValue1, random2 : rValue2, random3: rValue3});
		}	
		res.send("Producto no encontrado");
	},

	edicionProducto: (req, res) => {
		let idProducto = req.params.id;

		let productobuscado = null;

		for(let p of products){
			if(p.id==idProducto){
				productobuscado=p;
				break;
			}
		}

		if(productobuscado!=null){
			res.render('./products/edicionProducto', {producto : productobuscado})
		}
	},

	editar: (req, res) => {
		let idProducto = req.params.id;
		let datos = req.body;
		let imagenAntigua;

		console.log(req.file);
		console.log(req.body);

		for(let p of products){
			if(p.id==idProducto){
				imagenAntigua=p.image;

				p.name=datos.name,
				p.description=datos.description,
				p.specifications[0]=datos.material,
				p.specifications[1]=datos.weight,
				p.specifications[2]=datos.origin,
				p.price=parseInt(datos.price),
				p.discount=parseInt(datos.discount),
				p.category=datos.category,
				p.color=datos.color,
				p.type=datos.type,
				//Operador ternario para editar sin necesidad de imagen
				p.image=req.file?req.file.filename:p.image,
				//deleted sigue igual

				fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "), 'utf-8');

				//para eliminar imagen antigua
				if(imagenAntigua!=p.image){
					fs.unlinkSync(__dirname+'/../../public/imagenes/'+imagenAntigua);
				}

				res.redirect(`/products/detalle/${idProducto}`);

				break;
			}
		}

		
	},

	listadoProductos: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let deporteIngresado = req.params.categoria;
		//console.log(deporteIngresado)
		let paraLaVista = products.filter(elemento => elemento.category == deporteIngresado);
		res.render('./products/listadoProductos', {productos: paraLaVista});
	},

	delete: (req, res) => {
		let idProduct = req.params.id;
		let deleteImg = '';
		for (let p of products) {
			if (p.id == idProduct) {
				deleteImg = p.image;
				p.deleted = 1;
				break;
			}
		}
		fs.writeFileSync(
			path.join(__dirname, '/../data/productsJSON.json'),
			JSON.stringify(products, null, ' '),
			'utf-8'
		);
		fs.unlinkSync(__dirname + '/../../public/imagenes/' + deleteImg);
		res.redirect('/');
	}
};

module.exports = productsController;
