function ConvenioDao(connection) {
    this._connection = connection;
}

ConvenioDao.prototype.verificaCliente = function (convenio,callback) {
	this._connection.query('select * from tblConvenio where tblConvenio_ClienteHash_StrL = ?', [convenio],callback);	
}


module.exports = function(){
    return ConvenioDao;
};
