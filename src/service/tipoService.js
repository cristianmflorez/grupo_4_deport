const db = require('../database/models');

const tipoService = {
    llamarTabla: () => {
		db.Tipo.findAll();
	}
}

module.exports = tipoService;