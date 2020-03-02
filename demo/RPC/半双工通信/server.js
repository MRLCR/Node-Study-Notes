const net = require('net');
const {searchBookName} = require('../code');

const server = net.createServer((socket) => {
    socket.on('data', (buffer) => {
        setTimeout(() => {
            socket.write(searchBookName(buffer.toString()));
        }, 1000);
    });
});

server.listen(3000);
