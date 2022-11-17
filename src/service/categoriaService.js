const db = require('../database/models');

const categoriaService = {
    llamarTabla: () => {
		db.Tipo.findAll();
	}
}

module.exports = categoriaService;