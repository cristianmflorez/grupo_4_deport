module.exports = (sequelize, Datatypes) => {
    const Comentario = sequelize.define(
        "Comentario",
        {
            idComentarios: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            contenido: {type: Datatypes.TEXT},
            puntuacion: {type: Datatypes.INTEGER},
            fechacomentario: {type: Datatypes.DATE},
            Productos_idProductos: {type: Datatypes.INTEGER},
            Usuarios_idUsuarios: {type: Datatypes.INTEGER}
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "Comentarios"
        }  
    );

    //Relaciones 
    Comentario.associate = function(modelos){

        Comentario.belongsTo(modelos.Producto, {   
            as: "producto",
            foreignKey: "Productos_idProductos"
        });

        Comentario.belongsTo(modelos.Usuario, {   
            as: "usuario",
            foreignKey: "Usuarios_idUsuarios"
        });

    };

    return Comentario;
    
};
  
  


 