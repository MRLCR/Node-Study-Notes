const net = require('net');
const {searchBookName} = require('../code');

const server = net.createServer((socket) => {
    socket.on('data', (buffer) => {
        socket.write(searchBookName(buffer.toString()));
    });
});

server.listen(3000);
