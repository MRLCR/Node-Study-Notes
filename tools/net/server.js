const net = require('net');

const server = net.createServer((socket) => {
    socket.on('data', (buffer) => {
        console.log('Client message received: ', buffer.toString());
    })
});

server.listen(4000);
