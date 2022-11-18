module.exports = (sequelize, Datatypes) => {
    const Tipo = sequelize.define(
        "Tipo",
        {
            idTipos: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            nombre: {type: Datatypes.STRING(45)},
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "Tipos"
        }  
    );

    //Relaciones 

    Tipo.associate = function(modelos){

        Tipo.hasMany(modelos.Producto, {   
            as: "producto",
            foreignKey: "Tipos_idTipos"
        });
    };

    return Tipo;
    
};
  
  
