const productsService = require('../service/ProductsService');
const usersService = require('../service/usersService');
const obtenerTablaCategoria = require('../service/categoriaService');
const detalleVentaService = require('../service/detalleVentaService');
const ventaService = require('../service/ventaService');

const apiController = {
	userList: (req, res) => {
		usersService.buscarTodosUsuarios().then((usuarios) => {
			let requestedInfo = [];
			let oneUser;
			for (let index = 0; index < usuarios.length; index++) {
				oneUser = {
					idUsuarios: usuarios[index].idUsuarios,
					nombre: usuarios[index].nombre,
					email: usuarios[index].email,
					telefono: usuarios[index].telefono,
					imagen: 'https://alls-ports.onrender.com/imagenes/users/'+usuarios[index].imagen,
					url: 'https://alls-ports.onrender.com/api/users/' + usuarios[index].idUsuarios
				};
				requestedInfo.push(oneUser);
			}
			return res.json({
				total: usuarios.length,
				data: requestedInfo,
				status: 200
			});
		});
	},
	oneUser: (req, res) => {
		usersService.buscarUsuarioId(req.params.id).then((usuario) => {
			return res.json({
				data: {
					idUsuarios: usuario.idUsuarios,
					nombre: usuario.nombre,
					email: usuario.email,
					telefono: usuario.telefono,
					direccion: usuario.direccion,
					imagen: 'https://alls-ports.onrender.com/imagenes/users/' + usuario.imagen
				},
				status: 200
			});
		});
	},
	lastUser: (req, res) => {
		usersService.buscarTodosUsuarios().then((usuarios) => {
			return res.json({
				data: {
					idUsuarios: usuarios[usuarios.length - 1].idUsuarios,
					nombre: usuarios[usuarios.length - 1].nombre,
					email: usuarios[usuarios.length - 1].email,
					telefono: usuarios[usuarios.length - 1].telefono,
					direccion: usuarios[usuarios.length - 1].direccion,
					imagen:
						'https://alls-ports.onrender.com' +
						'/imagenes/users/' +
						usuarios[usuarios.length - 1].imagen
				},
				status: 200
			});
		});
	},

	productsList: (req, res) => {
		productsService.buscarTodosProductos().then((productos) => {
			let requestedInfo = [];
			let oneProduct;
			for (let index = 0; index < productos.length; index++) {
				oneProduct = {
					idProductos: productos[index].idProductos,
					nombre: productos[index].nombre,
					precio: productos[index].precio,
					descuento: productos[index].descuento,
					descripcion: productos[index].descripcion,
					Categorias_idCategorias: productos[index].Categorias_idCategorias,
					detalle:
						'https://alls-ports.onrender.com/api/products/' + productos[index].idProductos,
					imagen:'https://alls-ports.onrender.com'+'/imagenes/products/'+productos[index].imagen
				};
				requestedInfo.push(oneProduct);
			}
			res.json({
				total: productos.length,
				data: requestedInfo,
				status: 200
			});
		});
	},
	oneProduct: (req, res) => {
		productsService.buscarProductoId(req.params.id).then((producto) => {
			return res.json({
				data: {
					idProductos: producto.idProductos,
					nombre: producto.nombre,
					descripcion: producto.descripcion,
					Categorias_idCategorias: producto.Categorias_idCategorias,
					imagen: 'https://alls-ports.onrender.com' + '/imagenes/products/' + producto.imagen
				},
				status: 200
			});
		});
	},
	lastProduct: (req, res) => {
		productsService.buscarTodosProductos().then((productos) => {
			return res.json({
				data: {
					idProductos: productos[productos.length - 1].idProductos,
					nombre: productos[productos.length - 1].nombre,
					descripcion: productos[productos.length - 1].descripcion,
					Categorias_idCategorias:
						productos[productos.length - 1].Categorias_idCategorias,
					imagen:
						'https://alls-ports.onrender.com' +
						'/imagenes/products/' +
						productos[productos.length - 1].imagen
				},
				status: 200
			});
		});
	},

	categoriesList: (req, res) => {
		obtenerTablaCategoria().then((categorias) => {
			let requestedInfo = [];
			for (let index = 0; index < categorias.length; index++) {
				productsService
					.buscarProductoCategoria(categorias[index].nombre)
					.then((productos) => {
						requestedInfo.push({
							category: categorias[index].nombre,
							countByCategory: productos.length,
							data: productos
						});
						if (index == categorias.length - 1) {
							return res.json({
								data: requestedInfo,
								status: 200
							});
						}
					});
			}
		});
	},
	purchasesList: (req, res) => {
		detalleVentaService.buscarTodoDetalleVenta().then((detalles) => {
			let montoTotalVentas = 0;
			var cantidadTotalVentas = 0;
			for (let index = 0; index < detalles.length; index++) {
				montoTotalVentas += parseFloat(detalles[index].monto);
				ventaService
					.buscarVentasDetalleVenta(detalles[index].idDetallesVenta)
					.then((ventas) => {
						for (let i = 0; i < ventas.length; i++) {
							cantidadTotalVentas += parseInt(ventas[i].cantidad);
						}
						if (index == detalles.length - 1) {
							return res.json({
								data: {
									montoTotalVentas: montoTotalVentas,
									cantidadTotalVentas: cantidadTotalVentas
								},
								status: 200
							});
						}
					});
			}
		});
	}
};

module.exports = apiController;
