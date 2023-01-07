module.exports = (sequelize, Datatypes) => {
    const DetalleVenta = sequelize.define(
        "DetalleVenta",
        {
            idDetallesVenta: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
            fecha: {type: Datatypes.DATEONLY},
            monto: {type: Datatypes.FLOAT},
        },
        {
            camelCase: false, 
            timestamps: false,
            tableName: "DetallesVenta"
        }  
    );

    //Relaciones 

    DetalleVenta.associate = function(modelos){

        DetalleVenta.hasMany(modelos.Venta, {   
            as: "venta",
            foreignKey: "DetallesVenta_idDetallesVenta"
        });
    };

    return DetalleVenta;
    
};
  
  
