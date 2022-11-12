function categoriasData(sequelize, Datatypes){

    alias = 'categorias';
  
    cols = {
      idCategorias: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(45)},
    };
  
    config = {camelCase: false, timestamps: false}; 
  
    const categorias = sequelize.define(alias,cols,config);

    //Relaciones 
    categorias.associate = function (modelos){

        categorias.hasMany(modelos.productos, {   
            as: "productos",
            foreignKey: "Categorias_idCategorias"
        });
    }

    return categorias;
    
}
  
  
module.exports = categoriasData;