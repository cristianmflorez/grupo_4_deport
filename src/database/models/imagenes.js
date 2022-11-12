function imagenesData(sequelize, Datatypes){

    alias = 'imagenes';
  
    cols = {
      idImagenes: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(45)},
    };
  
    config = {camelCase: false, timestamps: false}; 
  
    const imagenes = sequelize.define(alias,cols,config);

    //Relaciones 
    imagenes.associate = function (modelos){

        imagenes.hasMany(modelos.productos, {   
            as: "productos",
            foreignKey: "Imagenes_idImagenes"
        });
    }

    return imagenes;
    
}
  
  
module.exports = imagenesData;