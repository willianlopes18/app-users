var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'app18',
			database: 'appinc'
		});
}

module.exports = function() {
	return createDBConnection;
}
