const db = require('../database/models');
const bcryptjs = require('bcryptjs');

function buscarTodosUsuarios() {
	return db.Usuario.findAll();
}

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

function crearUsuarioSinImagen(datos, administrador) {
	return db.Usuario.create({
		nombre: datos.nombre.trim(),
		email: datos.correo.trim(),
		telefono: datos.telefono.trim(),
		password: bcryptjs.hashSync(datos.password.trim(), 12),
		direccion: datos.direccion.trim(),
		imagen: 'default.png',
		admin: administrador,
		Paises_idPaises: datos.pais
	});
}

function crearUsuarioConImagen(datos, administrador, foto) {
	return db.Usuario.create({
		nombre: datos.nombre.trim(),
		email: datos.correo.trim(),
		telefono: datos.telefono.trim(),
		password: bcryptjs.hashSync(datos.password.trim(), 12),
		direccion: datos.direccion.trim(),
		imagen: foto,
		admin: administrador,
		Paises_idPaises: datos.pais
	});
}

function borrarUsuario(id) {
	return db.Usuario.destroy({
		where: { idUsuarios: id }
	});
}

function editarUsuarioConImagen(id, datos, foto) {
	return db.Usuario.update(
		{
			nombre: datos.nombre.trim(),
			email: datos.correo.trim(),
			telefono: datos.telefono.trim(),
			direccion: datos.direccion.trim(),
			imagen: foto,
			Paises_idPaises: datos.pais
		},
		{
			where: { idUsuarios: id }
		}
	);
}

function editarUsuarioSinImagen(id, datos) {
	return db.Usuario.update(
		{
			nombre: datos.nombre.trim(),
			email: datos.correo.trim(),
			telefono: datos.telefono.trim(),
			direccion: datos.direccion.trim(),
			Paises_idPaises: datos.pais
		},
		{
			where: { idUsuarios: id }
		}
	);
}

module.exports = {
	buscarTodosUsuarios,
	buscarUsuarioEmail,
	buscarUsuarioId,
	crearUsuarioSinImagen,
	crearUsuarioConImagen,
	borrarUsuario,
	editarUsuarioConImagen,
	editarUsuarioSinImagen
};
