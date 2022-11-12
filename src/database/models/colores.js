function coloresData(sequelize, Datatypes){

    alias = 'colores';
  
    cols = {
      idColores: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(45)},
    };
  
    config = {camelCase: false, timestamps: false}; 
  
    const colores = sequelize.define(alias,cols,config);

    //Relaciones 
    colores.associate = function (modelos){

        colores.hasMany(modelos.productos, {   
            as: "productos",
            foreignKey: "Colores_idColores"
        });
    }

    return colores;
    
}
  
  
module.exports = coloresData;