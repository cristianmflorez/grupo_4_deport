module.exports = (sequelize, Datatypes) => {
    const Usuario = sequelize.define(
        "Usuario",
        {
            idUsuarios: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            email: {type: Datatypes.STRING(100)},
            telefono: {type: Datatypes.FLOAT},
            password: {type: Datatypes.STRING(1000)},
            direccion: {type: Datatypes.STRING(100)},
            imagen: {type: Datatypes.DATE},
            admin: {type: Datatypes.DATE},
          },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "usuarios"
        }  
    );

    //Relaciones 
    Usuario.associate = function(modelos){

        Usuario.hasMany(modelos.Comentario, {   
            as: "comentario",
            foreignKey: "Usuarios_idUsuarios"
        });

        Usuario.hasMany(modelos.Favorito, {   
            as: "favorito",
            foreignKey: "Usuarios_idUsuarios"
        });
        
        Usuario.hasMany(modelos.Venta, {   
            as: "venta",
            foreignKey: "Usuarios_idUsuarios"
        });
    
        Usuario.belongsTo(modelos.Pais, {
            as: "pais",
            foreignKey: "Paises_idPaises"
        });
    };

    return Usuario;
    
};
  
  


 





