const db = require('../database/models');

const paisService = {
	llamarTabla: () => {
		db.Tipo.findAll();
	}
};

module.exports = paisService;
