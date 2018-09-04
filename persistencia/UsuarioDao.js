function CadastroUsuarioDao(connection) {
    this._connection = connection;
}

function fillUser(user){
	
	dados = {
		tblUsuario_Codigo_Id,
		tblUsuario_Nome_StrM:user.nome,
		tblUsuario_SobreNome_StrM:user.sobrenome,
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
	this._connection.query('select tblUsuario_Email_StrL from tblUsuario where tblUsuario_Email_StrL = ?', [validaDados.email],callback);	
}

CadastroUsuarioDao.prototype.Autentica = function (validaDados,callback){
	this._connection.query('select * from tblUsuario where tblUsuario_Email_StrL = ? AND tblUsuario_Senha_StrL = ?', [validaDados.login,validaDados.senha],callback);
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

module.exports = function(){
    return CadastroUsuarioDao;
};
