var crypto  = require('crypto');
var auth    = require('./ControllerAuth');

module.exports = function(app){
  
  app.ConfirmarUsuario = function(req, res){
    var usuario = {};
    
    usuario.id = req.params.id;;
    usuario.status = 1;
    
    var connection = app.persistencia.ConnectionFactory();
    var UsuarioDao = new app.persistencia.UsuarioDao(connection);
    
    UsuarioDao.confirmar(usuario, function(erro){
      if (erro){
        res.status(500);
        return;
      }
      console.log('usuario confirmado');
      res.send(usuario);
    });
    
  };
  
  app.CadastrarUsuario = function(req, res){
    
    if (req.body["cadastro_usuario"]) {
      var usuario = req.body["cadastro_usuario"].dados;
      var validaUsuario = {email:usuario.email};
      
      console.log('processando uma requisicao de um novo usuario'); 
      
      var connection = app.persistencia.ConnectionFactory();
      var UsuarioDao = new app.persistencia.UsuarioDao(connection);
      
      UsuarioDao.validarDados(validaUsuario,function(erro,resultado){      
        if(resultado.length > 0){
          res.status(401).send("Esse e-mail já está cadastrado!");
          return;
        }else{
          usuario.status    = 0;
          usuario.cadastro  = new Date;
          usuario.senha     = crypto.createHash('md5').update(usuario.senha).digest("hex");
          
          UsuarioDao.salvar(usuario, function(erro, resultado){
            if(erro){
              console.log('Erro ao inserir no banco:' + erro);
              res.status(500).send("Tente novamente mais tarde");
            } else {
              usuario.id = resultado.insertId;
              console.log('usuario criado');
              res.location('/confirmar/cadastro/' + usuario.id);
              var response = {
                dados_do_usuario: usuario,
                links: [
                  {
                    href:"http://localhost:3000/confirmar/cadastro/" + usuario.id,
                    rel:"confirmar",
                    method:"PUT"
                  }
                ]
              }
              
              res.status(201).json(response);
              
            }
          });
        }
        
      });
    }else{
      res.sendStatus(501);
    }
  };
  
  return app;
}