function CadastroCheckinDao(connection) {
    this._connection = connection;
}

function fillCheckin(checkin){
	
	dados = {
        tblEvento_Codigo_Id:checkin.idEvento,
        tblUsuario_Codigo_Id:checkin.idUsuario,
        tblCheckin_DtRegistro_Dat:checkin.data
	};
	return dados;
}

CadastroCheckinDao.prototype.salva = function(cadastroCheckin,callback) {
	this._connection.query('INSERT INTO tblCheckin SET ?', fillCheckin(cadastroCheckin), callback);
}

CadastroCheckinDao.prototype.lista = function(callback) {
    this._connection.query('select * from tblCheckin',callback);
}

module.exports = function(){
    return CadastroCheckinDao;
};
