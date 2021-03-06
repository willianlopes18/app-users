var crypto  = require('crypto');
var auth    = require('./ControllerAuth');

module.exports = function(app){
    
    app.CadastrarEvento = function(req, res){
        
        var solicitacao = req.body["cadastro_evento"];
        if(solicitacao.evento){
            var evento = solicitacao.evento;
            
            console.log('processando uma requisicao de um novo usuario'); 
            
            var connection = app.persistencia.ConnectionFactory();
            var EventoDao = new app.persistencia.EventoDao(connection);

            EventoDao.salvar(evento,function(erro,result){
                if(result){
                    res.status(201).send("Evento cadastrado com sucesso!");
                }else{
                    console.log('Erro ao inserir no banco:' + erro);
                    res.sendStatus(500).send("Tente novamente mais tarde!");
                }
            });
        }else{
            res.sendStatus(401);
        }
        
    };
    
    app.ListarEventos = function(req,res){ 
        var connection = app.persistencia.ConnectionFactory();
        var EventoDao = new app.persistencia.EventoDao(connection);    
        EventoDao.lista(function(erro,resultado){
            if(resultado){
                res.json(resultado);
            }else{
                res.sendStatus(500).send("tente novamente mais tarde!");
            }
        });
    };
    
    return app;
}