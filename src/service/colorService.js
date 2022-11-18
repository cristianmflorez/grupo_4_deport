const db = require('../database/models');

const colorService = {
    llamarTabla: () => {
		db.Color.findAll();
	}
}

module.exports = colorService;