module.exports = (sequelize, Datatypes) => {
    const Pais = sequelize.define(
        "Pais",
        {
            idPaises: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            nombre: {type: Datatypes.STRING(45)},
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "Paises"
        }  
    );

    //Relaciones 

    Pais.associate = function(modelos){

        Pais.hasMany(modelos.Producto_Pais, { 
            as: "producto",
            foreignKey: "Paises_idPaises",
         }); 

        Pais.hasMany(modelos.Usuario, {   
            as: "usuario",
            foreignKey: "Paises_idPaises"
        });
    };

    return Pais;
    
};
  

