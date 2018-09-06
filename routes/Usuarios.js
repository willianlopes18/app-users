var ControllerUsuarios = require('../controllers/ControllerUsuarios');
var ControllerAuth = require('../controllers/ControllerAuth');

module.exports = function(app) {

    app.post('/usuario/login',function(req,res){
        ControllerAuth(app).Autenticar(req,res);
    });

    app.post('/usuario/cadastrar',function(req,res){
        ControllerUsuarios(app).CadastrarUsuario(req,res);
    });

    app.put('/usuario/confirmar/cadastro/:id',function(req,res){
        ControllerUsuarios(app).ConfirmarUsuario(req,res);
    });

    app.get('/auth/usuario/lista',function(req,res){
        ControllerUsuarios(app).ListarUsuarios(req,res);
    });
    
};