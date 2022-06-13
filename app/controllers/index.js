//Controle que será passado para as rotas
module.exports.home = function(aplicacao, req, res){
        // Renderiza o index na rota home (/)
        //E passando a variável validação para a index como um parametro vazio
        res.render('index', {validacao: {}})
}