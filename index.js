const app = require('./src/app');

const port = process.env.PORT || 3005;

app.listen(port, function () {
	console.log('corriendo en puerto 3005...');
});