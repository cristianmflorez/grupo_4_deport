function tiposData(sequelize, Datatypes){

    alias = 'tipos';
  
    cols = {
      idTipos: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(45)},
    };
  
    config = {camelCase: false, timestamps: false}; 
  
    const tipos = sequelize.define(alias,cols,config);

    //Relaciones 
    tipos.associate = function (modelos){

        tipos.hasMany(modelos.productos, {   
            as: "productos",
            foreignKey: "Tipos_idTipos"
        });
    }

    return tipos;
    
}
  
  
module.exports = tiposData;