var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'users'
		});
}

module.exports = function() {
	return createDBConnection;
}
