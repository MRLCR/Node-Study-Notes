const RPC = require('./rpc-server');

const server = (protobufReqSchema, protobufResSchema) => new RPC({
    // 解码请求包
    decodeRequest(buffer) {
        const seq = buffer.readUInt32BE();

        return {
            seq: seq,
            result: protobufReqSchema.decode(buffer.slice(8))
        }
    },
    // 编码返回包
    encodeResponse(data, seq) {
        const body = protobufResSchema.encode(data);

        const head = Buffer.alloc(8);
        head.writeUInt32BE(seq);
        head.writeUInt32BE(body.length, 4);

        return Buffer.concat([head, body]);
    },
    // 判断请求包是不是接收完成
    isCompleteRequest(buffer) {
        const bodyLength = buffer.readUInt32BE(4);

        return 8 + bodyLength
    },
});

module.exports = server;
