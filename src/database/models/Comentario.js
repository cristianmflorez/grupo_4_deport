module.exports = (sequelize, Datatypes) => {
    const Comentario = sequelize.define(
        "Comentario",
        {
            idComentarios: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            contenido: {type: Datatypes.STRING(1000)},
            puntuacion: {type: Datatypes.INTEGER},
            fechacomentario: {type: Datatypes.DATE},
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "comentarios"
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
  
  


 