module.exports = (sequelize, Datatypes) => {
    const Imagen = sequelize.define(
        "Imagen",
        {
            idImagenes: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            nombre: {type: Datatypes.STRING(45)},
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "imagenes"
        }  
    );

    //Relaciones 

    Imagen.associate = function(modelos){

        Imagen.hasMany(modelos.Producto, {   
            as: "producto",
            foreignKey: "Imagenes_idImagenes"
        });
    }

    return Imagen;
    
}
  
  
