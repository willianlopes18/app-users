function CadastroCheckinDao(connection) {
    this._connection = connection;
}

function fillCheckin(checkin){
	
	dados = {
        tblEvento_Codigo_Id:checkin.idEvento,
        tblUsuario_Codigo_Id:checkin.idUsuario,
        tblCheckin_Registro_Dat:checkin.data
	};
	return dados;
}

CadastroCheckinDao.prototype.salvar = function(cadastroCheckin,callback) {
	this._connection.query('INSERT INTO tblCheckin SET ?', fillCheckin(cadastroCheckin), callback);
}

CadastroCheckinDao.prototype.listar = function(callback) {
    this._connection.query('select * from tblCheckin',callback);
}

module.exports = function(){
    return CadastroCheckinDao;
};
