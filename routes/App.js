module.exports = function(app) {

    var api = app.controllers.ControllerAuth;

    // Vefica se a plataforma pode realizar solicitações 
    app.use('*',api.VerificaCliente);

    // Rotas com autorização do token
    app.use('/auth', api.VerificaToken);
};