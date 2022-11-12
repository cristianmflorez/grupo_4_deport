function ventasData(sequelize, Datatypes){

    alias = 'ventas';
  
    cols = {
      idVentas: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      cantidad: {type: Datatypes.INTEGER},
    };
  
    config = {camelCase: false, timestamps: false}; 
  
    const ventas = sequelize.define(alias,cols,config);

    //Relaciones 
    ventas.associate = function (modelos){

        ventas.belongsTo(modelos.productos, {   
            as: "productos",
            foreignKey: "Productos_idProductos"
        });

        ventas.belongsTo(modelos.usuarios, {   
            as: "usuarios",
            foreignKey: "Usuarios_idUsuarios"
        });

        ventas.belongsTo(modelos.detallesVenta, {   
            as: "detallesVenta",
            foreignKey: "DetallesVenta_idDetallesVenta"
        });

    }
  
    return ventas;
}
  
  
module.exports = ventasData;