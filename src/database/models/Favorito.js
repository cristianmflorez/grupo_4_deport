module.exports = (sequelize, Datatypes) => {
    const Favorito = sequelize.define(
        "Favorito",
        {
            idFavoritos: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "favoritos"
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
  
  


 