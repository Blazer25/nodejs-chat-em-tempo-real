const { emit } = require("nodemon")
const app = require("../../config/server")

module.exports.iniciaChat = function(aplicacao, req, res){

    //Pega os dados do form da home utilizando o body-parser
    const dadosFormulario = req.body

    //Utilizando o express-validator para validar os campos
    req.assert('apelido', 'Nome ou apelido é obrigatorio').notEmpty() //apelido não pode ser vazio
    req.assert('apelido', 'Nome ou apelido Deve contér entre 2 e 25 caracteres').len(2, 25) //tamanho minimo e maximo do apelido


    //constante de erros do express-validar
    const errosExpressValidator = req.validationErrors()
    if(errosExpressValidator){
        //Se houver erros, será renderizado na index a variável validacao com os erros
        res.render('index', {validacao: errosExpressValidator})
        return
    }
    
    //Emissão de um evento (websocket) para a view
    // Variável io que é pegada do arquivo app.js, instânciada globalmente
    aplicacao.get('io').emit(
        'msgParaCliente',
        // O 2o param do emit é o que será passado para a função de callback do ON na view
        {
            apelido: dadosFormulario.apelido,
            mensagem: 'Acabou de entrar no chat!'
        }
    )

    // Renderiza o arquivo de chat na rota /chat e passando para o chat na views o param dadosFormulario
    res.render('chat', {dadosFormulario: dadosFormulario})
}