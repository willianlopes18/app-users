function CadastroUsuarioDao(connection) {
    this._connection = connection;
}

function fillUser(user){
	
	dados = {
		tblUsuario_Nome_StrM:user.nome,
		tblUsuario_SobreNome_StrM:user.sobrenome,
	    tblUsuario_Codigo_CPF:user.CPF,
	    tblUsuario_Sexo_Lst:user.sexo,
	    tblUsuario_Email_StrL:user.email,
	    tblUsuario_Senha_StrL:user.senha,
	    tblUsuario_Nascimento_Dat:user.nascimento,
	    tblUsuario_DataCadastro_Dat:user.cadastro,
	    tblUsuario_Status_Bol:user.status
	};
	return dados;
}

CadastroUsuarioDao.prototype.validaDados = function (validaDados,callback) {
	this._connection.query('select tblUsuario_Codigo_CPF,tblUsuario_Email_StrL from tblUsuario where tblUsuario_Codigo_CPF = ? OR tblUsuario_Email_StrL = ?', [validaDados.CPF,validaDados.email],callback);	
}

CadastroUsuarioDao.prototype.Autentica = function (validaDados,callback){
	this._connection.query('select * from tblUsuario where tblUsuario_Codigo_CPF = ? AND tblUsuario_Senha_StrL = ?', [validaDados.login,validaDados.senha],callback);
}

CadastroUsuarioDao.prototype.salva = function(cadastroUsuario,callback) {
	this._connection.query('INSERT INTO tblUsuario SET ?', fillUser(cadastroUsuario), callback);
}

CadastroUsuarioDao.prototype.confirma = function(cadastroUsuario,callback) {
    this._connection.query('UPDATE tblUsuario SET tblUsuario_Status_Bol = ? where tblUsuario_Codigo_Id = ?', [cadastroUsuario.status, cadastroUsuario.id], callback);
}

CadastroUsuarioDao.prototype.lista = function(callback) {
    this._connection.query('select * from tblUsuario',callback);
}

CadastroUsuarioDao.prototype.buscaPorCPF = function (CPF,callback) {
	this._connection.query('select * from tblUsuario where tblUsuario_Codigo_Id = ?', [CPF],callback);	
}


module.exports = function(){
    return CadastroUsuarioDao;
};
