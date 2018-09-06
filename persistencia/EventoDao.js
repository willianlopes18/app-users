function CadastroEventoDao(connection) {
    this._connection = connection;
}

function fillEvent(event){
	
	dados = {
		// tblEvento_Codigo_Id, **Campo AutoIncremento**
        tblEvento_Nome_StrL:event.nome,
        tblEvento_Inicio_Dat:event.Inicio,
        tblEvento_Fim_Dat:event.Fim
	};
	return dados;
}

CadastroEventoDao.prototype.salvar = function(cadastroEvento,callback) {
	this._connection.query('INSERT INTO tblEvento SET ?', fillEvent(cadastroEvento), callback);
}

CadastroEventoDao.prototype.listar = function(callback) {
    this._connection.query('select * from tblEvento',callback);
}

module.exports = function(){
    return CadastroEventoDao;
};
