function comentariosData(sequelize, Datatypes){

    alias = 'comentarios';
  
    cols = {
      idComentarios: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      contenido: {type: Datatypes.STRING(1000)},
      puntuacion: {type: Datatypes.INTEGER},
      fechacomentario: {type: Datatypes.DATE},
    };
  
    config = {camelCase: false, timestamps: false}; 
  
    const comentarios = sequelize.define(alias,cols,config);

    //Relaciones 
    comentarios.associate = function (modelos){

        comentarios.belongsTo(modelos.productos, {   
            as: "productos",
            foreignKey: "Productos_idProductos"
        });

        comentarios.belongsTo(modelos.usuarios, {   
            as: "usuarios",
            foreignKey: "Usuarios_idUsuarios"
        });

    }
  
    return comentarios;
}
  
  
module.exports = comentariosData;