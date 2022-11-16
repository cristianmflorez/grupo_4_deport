module.exports = (sequelize, Datatypes) => {
    const Imagen = sequelize.define(
        "Imagen",
        {
            idImagenes: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            nombre: {type: Datatypes.STRING(45)},
            Productos_idProductos : {type: Datatypes.INTEGER}
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "imagenes"
        }  
    );

    //Relaciones 

    Imagen.associate = function(modelos){

        Imagen.belongsTo(modelos.Producto, {   
            as: "producto",
            foreignKey: "Productos_idProductos"
        });
    }

    return Imagen;
    
}
  
  
