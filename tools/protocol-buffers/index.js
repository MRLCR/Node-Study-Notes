const fs = require('fs');
const protobuf = require('protocol-buffers');

const schema = protobuf(fs.readFileSync(`${__dirname}/test.proto`, 'utf-8'));

const buffer = schema.Book.encode({
    id: 1,
    name: '物理书',
    price: 9800,
});

console.log(buffer);
console.log(schema.Book.decode(buffer));
console.log(buffer.readUIntBE(2, 3));
