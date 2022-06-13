module.exports = function(aplicacao){
    aplicacao.get('/', function(req, res){
        //Buscando dentro de controllers o código com a rota responsável
        aplicacao.app.controllers.index.home(aplicacao, req, res)
    })
}
