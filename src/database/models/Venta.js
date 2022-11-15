module.exports = (sequelize, Datatypes) => {
    const Venta = sequelize.define(
        "Venta",
        {
            idVentas: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            cantidad: {type: Datatypes.INTEGER},
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "ventas"
        }  
    );

    //Relaciones 
    Venta.associate = function(modelos){

        Venta.belongsTo(modelos.Producto, {   
            as: "producto",
            foreignKey: "Productos_idProductos"
        });

        Venta.belongsTo(modelos.Usuario, {   
            as: "usuario",
            foreignKey: "Usuarios_idUsuarios"
        });

        Venta.belongsTo(modelos.DetalleVenta, {   
            as: "DetalleVenta",
            foreignKey: "DetallesVenta_idDetallesVenta"
        });

    };

    return Venta;
    
};
  
  


 