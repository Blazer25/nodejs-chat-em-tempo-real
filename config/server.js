const express = require('express') //Express
const consign = require('consign') //Consign
const bodyParser = require('body-parser') //body-parser
const expressValidator = require('express-validator')//Express validator

//Const para iniciar o objeto do express
const app = express()

/*
 Para o EJS, responsável por colocar códigos JavaScript dentro do Html,
 setar as consts 'view engine' e 'view' do express
 */
app.set('view engine', 'ejs')
app.set('views', './app/views')



/* Configurando os Middlewares */
//middleware express.static
app.use(express.static('./app/public'))

//middleware body-parser, que permite recuperar os dados do body html via JSON
app.use(bodyParser.urlencoded({extended: true}))

//middleware express-validator
app.use(expressValidator())

//Consign para fazer o autoload dos models, rotas e controllers
consign()
    .include('app/routes') //autoload das rotas
    .then('app/models') //autoload das models
    .then('app/controllers') //autoload dos controllers
    .into(app) //insere dentro de app



// Exportando o objeto app que é a presentação do express
module.exports = app