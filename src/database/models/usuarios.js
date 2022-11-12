function usuariosData(sequelize, Datatypes){

    alias = 'usuarios';
  
    cols = {
      idUsuarios: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      email: {type: Datatypes.STRING(100)},
      telefono: {type: Datatypes.FLOAT},
      password: {type: Datatypes.STRING(1000)},
      direccion: {type: Datatypes.STRING(100)},
      imagen: {type: Datatypes.DATE},
      admin: {type: Datatypes.DATE},
    };
  
    config = {camelCase: false, timestamps: false}; 
  
    const usuarios = sequelize.define(alias,cols,config);

    //Relaciones 
    usuarios.associate = function (modelos){

        usuarios.hasMany(modelos.comentarios, {   
            as: "comentarios",
            foreignKey: "Usuarios_idUsuarios"
        });
        
        usuarios.hasMany(modelos.ventas, {   
            as: "ventas",
            foreignKey: "Usuarios_idUsuarios"
        });

        usuarios.belongsTo(modelos.paises, {
            as: "paises",
            foreignKey: "Paises_idPaises"
        });
    }
  
    return usuarios;
}
  
  
module.exports = usuariosData;