module.exports = (sequelize, Datatypes) => {
	const Producto = sequelize.define(
		'Producto',
		{
			idProductos: {
				type: Datatypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			nombre: { type: Datatypes.STRING(100) },
			precio: { type: Datatypes.FLOAT },
			descripcion: { type: Datatypes.TEXT },
			especificacion: { type: Datatypes.TEXT },
			descuento: { type: Datatypes.FLOAT },
			cantidad: { type: Datatypes.INTEGER },
			talla: { type: Datatypes.STRING(20) },
			Categorias_idCategorias: { type: Datatypes.INTEGER },
			Tipos_idTipos: { type: Datatypes.INTEGER },
			Colores_idColores: { type: Datatypes.INTEGER }
		},
		{
			camelCase: false,
			timestamps: false,
			tableName: 'productos'
		}
	); //cierre del define

	//Relaciones

	Producto.associate = function (modelos) {
		Producto.belongsTo(modelos.Categoria, {
			as: 'categoria',
			foreignKey: 'Categorias_idCategorias'
		});

		Producto.belongsTo(modelos.Color, {
			as: 'color',
			foreignKey: 'Colores_idColores'
		});

		Producto.belongsTo(modelos.Tipo, {
			as: 'tipo',
			foreignKey: 'Tipos_idTipos'
		});

		Producto.belongsToMany(modelos.Pais, {
			//DSC: con esto, no es necesario hacer el archivo .js del modelo de la tabla intermedia "Productos_paises".
			as: 'pais',
			through: 'productos_paises', // tabla intermedia
			foreignKey: 'Productos_idProductos', // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
			otherKey: 'Paises_idPaises1', // es el FK del otro modelo (en la tabla intermedia de la bd)
			timestamps: false
		});

		Producto.hasMany(modelos.Imagen, {
			as: 'imagen',
			foreignKey: 'Productos_idProductos'
		});

		Producto.hasMany(modelos.Favorito, {
			as: 'favorito',
			foreignKey: 'Productos_idProductos'
		});

		Producto.hasMany(modelos.Comentario, {
			as: 'comentario',
			foreignKey: 'Productos_idProductos'
		});

		Producto.hasMany(modelos.Venta, {
			as: 'venta',
			foreignKey: 'Productos_idProductos'
		});
	};

	return Producto;
};
