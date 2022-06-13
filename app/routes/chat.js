module.exports = function(aplicacao){
    aplicacao.get('/chat', function(req, res){
        aplicacao.app.controllers.chat.iniciaChat(aplicacao, req, res)
    })

    aplicacao.post('/chat', function(req, res){
        aplicacao.app.controllers.chat.iniciaChat(aplicacao, req, res)
    })
}

