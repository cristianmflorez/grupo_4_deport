function productosData(sequelize, Datatypes){

    alias = 'productos';
  
    cols = {
      idProductos: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(100)},
      precio: {type: Datatypes.FLOAT},
      descripcion: {type: Datatypes.STRING(1000)},
      especificacion: {type: Datatypes.STRING(100)},
      fechaCreacion: {type: Datatypes.DATE},
      fechaBaja: {type: Datatypes.DATE},
      descuento: {type: Datatypes.FLOAT},
      cantidad: {type: Datatypes.INTEGER},
      talla: {type: Datatypes.STRING(20)},
    };
  
    config = {camelCase: false, timestamps: false}; 
  
    const productos = sequelize.define(alias,cols,config);

    //Relaciones 
    productos.associate = function (modelos){

        productos.belongsTo(modelos.categorias, {   
            as: "categorias",
            foreignKey: "Categorias_idCategorias"
        });

        productos.belongsTo(modelos.colores, {   
            as: "colores",
            foreignKey: "Colores_idColores"
        });
        
        productos.belongsTo(modelos.tipos, {   
            as: "tipos",
            foreignKey: "Tipos_idTipos"
        });
        
        productos.belongsTo(modelos.imagenes, {   
            as: "imagenes",
            foreignKey: "Imagenes_idImagenes"
        });
        
        productos.belongsToMany(modelos.paises, { //DSC: con esto, no es necesario hacer el archivo .js del modelo de la tabla intermedia "Productos_paises".
                as: "paises",
                through: "productos_paises",   // tabla intermedia
                foreignKey: "Productos_idProductos",  // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
                otherKey: "Paises_idPaises1",    // es el FK del otro modelo (en la tabla intermedia de la bd)
                timestamps: false
        });     

        productos.hasMany(modelos.comentarios, {   
            as: "comentarios",
            foreignKey: "Productos_idProductos"
        });
        
        productos.hasMany(modelos.ventas, {   
            as: "ventas",
            foreignKey: "Productos_idProductos"
        });
    }
  
    return productos;
}
  
  
module.exports = productosData;