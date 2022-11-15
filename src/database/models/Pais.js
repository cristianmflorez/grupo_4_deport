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
            tableName: "paises"
        }  
    );

    //Relaciones 

    Pais.associate = function(modelos){

        Pais.belongsToMany(modelos.Producto, { //DSC: con esto, no es necesario hacer el archivo .js del modelo de la tabla intermedia "Productos_paises".
            as: "producto",
            through: "productos_paises",   // tabla intermedia
            foreignKey: "Paises_idPaises1",  // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
            otherKey: "Productos_idProductos",    // es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false
         }); 

        Pais.hasMany(modelos.Usuario, {   
            as: "usuario",
            foreignKey: "Paises_idPaises"
        });
    };

    return Pais;
    
};
  

