const db = require('../database/models');

const usersService = {
	buscarUsuarioEmail: (correo) => {
		db.Usuario.findOne({
			where: {
				email: correo
			}
		}).then((usuario) => {
			return usuario;
		});
	},
	crearUsuario: (datos, foto, administrador) => {
		db.Usuario.create({
			nombre: datos.nombre.trim(),
			email: datos.correo.trim(),
			telefono: datos.telefono.trim(),
			password: bcryptjs.hashSync(datos.password.trim(), 12),
			direccion: datos.direccion.trim(),
			imagen: foto,
			admin: administrador,
			Paises_idPaises: datos.pais
		});
	},
	borrarUsuario: (id) => {
		db.Usuario.destroy({
			where: { idUsuarios: id }
		});
	},
    buscarImagenUsuario: (id) => {
		db.Usuario.findAll({
			where: { idUsuarios: id }
		}).then((usuario) => {
			return usuario.imagen;
		})
    },
    editarUsuario: (id, datos, foto) => {
        db.Usuario.update({
			nombre: datos.nombre.trim(),
			email: datos.correo.trim(),
			telefono: datos.telefono.trim(),
			password: bcryptjs.hashSync(datos.password.trim(), 12),
			direccion: datos.direccion.trim(),
			imagen: foto,
			Paises_idPaises: datos.pais
		},
        {
            where: {idUsuarios : id}
        });
    }
};

module.exports = usersService;
