const db = require('../database/models');

const categoriaService = {
    llamarTabla: () => {
		db.Categoria.findAll();
	}
}

module.exports = categoriaService;