module.exports = (sequelize, Datatypes) => {
    const Producto_Pais = sequelize.define(
        "Producto_Pais",
        {
            idFavoritos: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            Productos_idProductos: {type: Datatypes.INTEGER},
            Paises_idPaises: {type: Datatypes.INTEGER}
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "Productos_Paises"
        }  
    );

    //Relaciones 
    Producto_Pais.associate = function(modelos){

        Producto_Pais.belongsTo(modelos.Producto, {   
            as: "producto",
            foreignKey: "Productos_idProductos"
        });

        Producto_Pais.belongsTo(modelos.Pais, {   
            as: "pais",
            foreignKey: "Usuarios_idUsuarios"
        });

    };

    return Producto_Pais;
    
};