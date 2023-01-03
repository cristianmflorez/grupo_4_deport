const productsService = require('../service/productsService');
const usersService = require('../service/usersService');
const obtenerTablaCategoria = require('../service/categoriaService');

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
					url: 'http://localhost:3005/api/users/' + usuarios[index].idUsuarios
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
					imagen: __dirname + '../public/imagenes/users/' + usuario.imagen
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
						__dirname +
						'../../public/imagenes/users/' +
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
					descripcion: productos[index].descripcion,
					Categorias_idCategorias: productos[index].Categorias_idCategorias,
					detalle:
						'http://localhost:3005/api/products/' + productos[index].idProductos
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
					imagen: __dirname + '../public/imagenes/products/' + producto.imagen
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
						__dirname +
						'../public/imagenes/products/' +
						productos[productos.length - 1].imagen
				},
				status: 200
			});
		});
	},

	categoriesList: async (req, res) => {
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
						console.log(requestedInfo);
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
	purchasesList: (req, res) => {}
};

module.exports = apiController;
