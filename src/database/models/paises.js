function paisesData(sequelize, Datatypes){

    alias = 'paises';
  
    cols = {
        idPaises: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        nombre: {type: Datatypes.STRING(45)},
      };
  
    config = {camelCase: false, timestamps: false}; 
  
    const paises = sequelize.define(alias,cols,config);

    //Relaciones 
    paises.associate = function (modelos){
        
        paises.belongsToMany(modelos.productos, { //DSC: con esto, no es necesario hacer el archivo .js del modelo de la tabla intermedia "Productos_paises".
                as: "productos",
                through: "productos_paises",   // tabla intermedia
                foreignKey: "Paises_idPaises1",  // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
                otherKey: "Productos_idProductos",    // es el FK del otro modelo (en la tabla intermedia de la bd)
                timestamps: false
        });    
        
        usuarios.hasMany(modelos.usuarios, {
            as: "usuarios",
            foreignKey: "Paises_idPaises"
        });
    }
  
    return paises;
}
  
  
module.exports = paisesData;