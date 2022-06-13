// Configurações do servidor
const app = require('./config/server')
const servidorUrl = 'http://localhost:80'
const tipoHospedagem = 'localhost'


//Porta do servidor protocolo HTTP
const servidor = app.listen(80, function () {
    console.log('Servidor Rodando!')
    console.log(`Server hospedado em ${tipoHospedagem} -> ${servidorUrl}`)
})


//Protocolo socket.io
const io = require('socket.io').listen(servidor)

//Criando a variável io globalmente
app.set('io', io)

// Criar a conexão por websocket
io.on('connection', function (socket) {
    console.log('Usuário on')

    //Caso quando o usuário se desconect, ou seja, a conexão do websocket não existe mais
    socket.on('disconnect', function () {
        console.log('Usuário off')
    })

    // Está escutando a mensagem do usuário enviada de views
    socket.on('msgParaServidor', function (data) {
        //Após recuperar a mensagem, está enviando-a de volta para o html, para ser renderizada
        // DIALOGOS
        socket.emit('msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            })
        //O broadcast faz com que a mensagem seja exibida para todos os usuários
        socket.broadcast.emit('msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            })



        // PARTICIPANTES / PESSOAS
        if (parseInt(data.apelidoAtualizadoNosParticipantes) == 0) {
            socket.emit('participantesParaCliente',
                {
                    apelido: data.apelido
                })
            socket.broadcast.emit('participantesParaCliente',
                {
                    apelido: data.apelido
                })
        }
    })
})