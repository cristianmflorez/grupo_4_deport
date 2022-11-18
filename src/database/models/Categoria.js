module.exports = (sequelize, Datatypes) => {
    const Categoria = sequelize.define(
        "Categoria",
        {
            idCategorias: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            nombre: {type: Datatypes.STRING(45)},
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "Categorias"
        }  
    );

    //Relaciones 

    Categoria.associate = function(modelos){

        Categoria.hasMany(modelos.Producto, {   
            as: "producto",
            foreignKey: "Categorias_idCategorias"
        });
    };

    return Categoria;
    
};
  
  
