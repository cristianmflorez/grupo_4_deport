const db = require('../database/models');
const bcryptjs = require('bcryptjs');

function buscarUsuarioEmail(correo) {
	return db.Usuario.findOne({
		where: {
			email: correo
		}
	});
}

function buscarUsuarioId(id) {
	return db.Usuario.findByPk(id);
}

function crearUsuario(datos, administrador) {
	return db.Usuario.create({
		nombre: datos.nombre.trim(),
		email: datos.correo.trim(),
		telefono: datos.telefono.trim(),
		password: bcryptjs.hashSync(datos.password.trim(), 12),
		direccion: datos.direccion.trim(),
		imagen: datos.foto,
		admin: administrador,
		Paises_idPaises: datos.pais
	});
}

function borrarUsuario(id) {
	db.Usuario.destroy({
		where: { idUsuarios: id }
	});
}

function editarUsuario(id, datos, foto) {
	db.Usuario.update(
		{
			nombre: datos.nombre.trim(),
			email: datos.correo.trim(),
			telefono: datos.telefono.trim(),
			password: bcryptjs.hashSync(datos.password.trim(), 12),
			direccion: datos.direccion.trim(),
			imagen: foto,
			Paises_idPaises: datos.pais
		},
		{
			where: { idUsuarios: id }
		}
	);
}

module.exports = {
	buscarUsuarioEmail,
	buscarUsuarioId,
	crearUsuario,
	borrarUsuario,
	editarUsuario
};
