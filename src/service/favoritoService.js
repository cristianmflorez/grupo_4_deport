const db = require('../database/models');

function obtenerTablaFavorito(idProducto) {
	return db.Favorito.findAll({
        where: {
            Productos_idProductos: idProducto
        }
    });
};

function crearFavorito(idProducto, idUsuario){
    return db.Favorito.create({
        Productos_idProductos: idProducto,
        Usuarios_idUsuarios: idUsuario
    })
}

function quitarFavorito(idProducto){
    return db.Favorito.destroy({
        where: {
            Productos_idProductos: idProducto,
        }
    })
}

module.exports = obtenerTablaFavorito;