const ws = require('ws')

const socketServer = new ws.Server({ port: 3030 })
socketServer.on('connection', (socketClient) => {
    console.log('connected');
    console.log('client Set length: ', socketServer.clients.size);
    socketClient.on('close', (socketClient) => {
        console.log('closed');
        console.log('Number of clients: ', socketServer.clients.size);
    });
});




// app.use(express.static('public'))

// var socket = require('socket.io')
// var io = socket(server);
// io.sockets.on('connection', (s) => {
//   console.log('new connection ' + s.id)

//   s.on('mouse', (data) => {
//     s.broadcast.emit('mouse', data)
//   })
// })

