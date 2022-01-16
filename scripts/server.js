// const { json } = require('express/lib/response');
// const ws = require('ws')
// const fs = require('fs')

// const socketServer = new ws.Server({ port: 3030 })
// socketServer.on('connection', (socketClient) => {
//     console.log('connected');
//     console.log('client Set length: ', socketServer.clients.size);
//     socketClient.on('close', (socketClient) => {
//         console.log('closed');
//         console.log('Number of clients: ', socketServer.clients.size);
//     });

//     socketClient.on('message', (message) => {
//         console.log("received a message " + message)
//         console.log("received a message " + message.data)
//         console.log("received a message " + message.type)
//         // let blob = new Blob(message)
//         // console.log("received a message " + blob)
//         // fs.writeFileSync('image.png', message, 'image/png   ')
        
//     })
//     // socketClient.on('')
// });

// console.log(socketServer)

let express = require('express')
let socket = require('socket.io')
let fs = require('fs')

let app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://' + host + ':' + port);
})

// app.use(express.static('public'))

var io = socket(server, {
    cors: {origin: '*'},
    maxHttpBufferSize: 1e8
});
io.sockets.on('connection', (s) => {
  console.log('new connection ' + s.id)

  s.on('image', (data) => {
    // s.broadcast.emit('mouse', data)
    console.log("received a message " + data)
    console.log("received a message " + data.data)
  })
  s.on('imageCapture', (data) => {
    // s.broadcast.emit('mouse', data)
    console.log("received a message " + data)
    console.log("received a message " + data.size)
    console.log("received a message " + data.mimeType)
    fs.writeFileSync('image.jpeg', data.data, 'base64')
  })
})

