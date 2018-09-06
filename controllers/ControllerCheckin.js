var auth    = require('./ControllerAuth');

module.exports = function(app){
    
    app.CadastrarCheckin = function(req, res){
        const token = req.headers['x-access-token'];

        if(token){    
            const solicitacao = req.body["cadastro_checkin"];
            var checkin;
            checkin.idEvento = solicitacao.checkin;

            if(solicitacao.checkin){
                auth.DecodificarToken(token, function(erro,result){
                    if(erro){
                        res.status(401);
                    }else{
                        if(result.idUsuario){
                            checkin.idUsuario = result.idUsuario;
                            checkin.data = new Date.now();
                            var connection = app.persistencia.ConnectionFactory();
                            var checkinDao = new app.persistencia.checkinDao(connection);
                            
                            checkinDao.salvar(checkin,function(erro,result){
                                if(result){
                                    res.status(201).send("checkin realizado!");
                                }else{
                                    console.log('Erro ao inserir no banco:' + erro);
                                    res.status(500).send("Tente novamente mais tarde!");
                                }
                            });
                        }else{
                            res.status(401);
                        }     
                    }
                });
            }else{
                res.status(401);
            }
        }     
    };
    
    return app;
}