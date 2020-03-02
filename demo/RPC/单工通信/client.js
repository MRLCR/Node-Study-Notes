const net = require('net');
const {getRandomBookId} = require('../code');

const socket = new net.Socket();

socket.connect({
    host: '127.0.0.1',
    port: 3000,
});

/**
 * 数据打包
 * @param {string} bookId 
 */
const encode = (bookId) => {
    const buffer = Buffer.alloc(2);
    buffer.write(bookId);
    console.log(buffer);
    return buffer;
}

const bookId = getRandomBookId();
socket.write(encode(bookId));

socket.on('data', (buffer) => {
    console.log(`书籍 ${bookId}: ${buffer.toString()}`);
});

