module.exports = (sequelize, Datatypes) => {
    const Color = sequelize.define(
        "Color",
        {
            idColores: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            nombre: {type: Datatypes.STRING(45)},
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "Colores"
        }  
    );

    //Relaciones 

    Color.associate = function(modelos){

        Color.hasMany(modelos.Producto, {   
            as: "producto",
            foreignKey: "Colores_idColores"
        });
    };

    return Color;
    
};
  
  
