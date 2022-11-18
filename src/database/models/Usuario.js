module.exports = (sequelize, Datatypes) => {
    const Usuario = sequelize.define(
        "Usuario",
        {
            idUsuarios: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            nombre: {type: Datatypes.STRING(45)},
            email: {type: Datatypes.STRING(45)},
            telefono: {type: Datatypes.STRING(45)},
            password: {type: Datatypes.STRING(300)},
            direccion: {type: Datatypes.STRING(100)},
            imagen: {type: Datatypes.STRING(100)},
            admin: {type: Datatypes.BOOLEAN}, //DSC: Toca cambiar el BIT de la base de datos por BOOLEAN
            Paises_idPaises: {type: Datatypes.INTEGER}
          },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "Usuarios"
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
  
  


 





