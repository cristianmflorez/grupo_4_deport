module.exports = (sequelize, Datatypes) => {
	const Producto = sequelize.define(
		'Producto',
		{
			idProductos: {
				type: Datatypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			nombre: { type: Datatypes.STRING(100) },
			precio: { type: Datatypes.FLOAT },
			descripcion: { type: Datatypes.TEXT },
			especificacion: { type: Datatypes.TEXT },
			descuento: { type: Datatypes.FLOAT },
			cantidad: { type: Datatypes.INTEGER },
			imagen: { type: Datatypes.STRING(100) },
			talla: { type: Datatypes.STRING(20) },
			Categorias_idCategorias: { type: Datatypes.INTEGER },
			Tipos_idTipos: { type: Datatypes.INTEGER },
			Colores_idColores: { type: Datatypes.INTEGER }
		},
		{
			camelCase: false,
			timestamps: false,
			tableName: 'Productos'
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

		Producto.hasMany(modelos.Producto_Pais, {
			as: 'pais',
			foreignKey: 'Productos_idProductos', 
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
