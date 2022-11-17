const db = require('../database/models');

const colorService = {
    llamarTabla: () => {
		db.Tipo.findAll();
	}
}

module.exports = colorService;