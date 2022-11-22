module.exports = (sequelize, Datatypes) => {
    const Favorito = sequelize.define(
        "Favorito",
        {
            idFavoritos: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            Productos_idProductos: {type: Datatypes.INTEGER},
            Usuarios_idUsuarios: {type: Datatypes.INTEGER}
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "Favoritos"
        }  
    );

    //Relaciones 
    Favorito.associate = function(modelos){

        Favorito.belongsTo(modelos.Producto, {   
            as: "producto",
            foreignKey: "Productos_idProductos"
        });

        Favorito.belongsTo(modelos.Usuario, {   
            as: "usuario",
            foreignKey: "Usuarios_idUsuarios"
        });

    };

    return Favorito;
    
};
  
  


 