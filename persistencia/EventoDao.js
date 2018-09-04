function CadastroEventoDao(connection) {
    this._connection = connection;
}

function fillEvent(event){
	
	dados = {
		tblEvento_Codigo_Id,
        tblEvento_Nome_StrL:event.nome,
        tblEvento_DtInicio_Dat:event.dataInicio,
        tblEvento_DtFim_Dat:event.dataFim
	};
	return dados;
}

CadastroEventoDao.prototype.salva = function(cadastroEvento,callback) {
	this._connection.query('INSERT INTO tblEvento SET ?', fillEvent(cadastroEvento), callback);
}

CadastroEventoDao.prototype.lista = function(callback) {
    this._connection.query('select * from tblEvento',callback);
}

module.exports = function(){
    return CadastroEventoDao;
};
