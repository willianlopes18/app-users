var jwt		= require('jsonwebtoken');
var crypto  = require('crypto');
var atob    = require('atob');

module.exports 	= function(app){
	app.VerificarCliente = function(req,res,next){
		const convenio = req.headers['convenio-app'];

		const connection = app.persistencia.ConnectionFactory();
		const ConvenioDao = new app.persistencia.ConvenioDao(connection);
		
		ConvenioDao.verificarCliente(convenio,function(erro,resultado){
			if(resultado.length > 0){
				next();
			}else{
				res.sendStatus(401);
			}
		})
		
	}
	
	app.Autenticar = function(req,res){
		if(req.body["user"]){
			var user = ({
				login: req.body.user.login,
				senha: crypto.createHash('md5').update(req.body.user.senha).digest("hex")
			});
			
			const connection = app.persistencia.ConnectionFactory();
			var UsuarioDao = new app.persistencia.UsuarioDao(connection);
			
			UsuarioDao.Autenticar(user,function(erro,resultado){
				if(resultado.length > 0){
					var token = jwt.sign({userId: resultado[0].tblUsuario_Codigo_Id, login: resultado[0].tblUsuario_Codigo_CPF}, app.get('secret'), {
						expiresIn: 84600
					});
					res.set('x-access-token', token);
					res.json(token); 
					res.end();
					
				}else{
					console.log('login ou senha incorretos');
					res.sendStatus(401);
				}
			});
		}else{
			res.sendStatus(401);
		}
	}
	
	app.VerificarToken = function(req, res, next) {
		var token = req.headers['x-access-token'];
		
		if (token) {
			console.log('Token recebido, decodificando');
			jwt.verify(token, app.get('secret'), function(err, decoded) {
				if (err) {
					console.log('Token rejeitado');
					return res.sendStatus(401);
				} else {
					console.log('Token aceito')
					req.usuario = decoded; 
					next();
				}
			});
		} else {
			console.log('Nenhum token enviado');
			return res.sendStatus(401);
		}
	}
	
	app.DecodificarToken = function(req,res){
		const t = req.headers['x-access-token'];
		let token = {};
		// token.raw = t;
		// token.header = JSON.parse(atob(t.split('.')[0]));
		token.payload = JSON.parse(atob(t.split('.')[1]));
		return token;
	}
	
	return app;
}	