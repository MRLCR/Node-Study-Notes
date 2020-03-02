const fs            = require('fs');
const protobuf      = require('protocol-buffers');
const EasySock      = require('easy_sock');

class BaseEasySock {
    constructor(props) {
        this.easySock = new EasySock(props);
    }
    init(path, req, res) {
        if (this.easySock) {
            const schemas = protobuf(fs.readFileSync(path));
            this.easySock.encode = (data, seq) => {
                const body = schemas[req].encode(data);
            
                const head = Buffer.alloc(8);
                head.writeInt32BE(seq);
                head.writeInt32BE(body.length, 4);
            
                return Buffer.concat([head, body])
            }
            
            this.easySock.decode = (buffer) => {
                const seq = buffer.readInt32BE();
                const body = schemas[res].decode(buffer.slice(8));
                
                return {
                    result: body,
                    seq
                }
            }
            
            this.easySock.isReceiveComplete = function(buffer) {
                if (buffer.length < 8) {
                    return 0
                }
            
                const bodyLength = buffer.readInt32BE(4);
                if (buffer.length >= bodyLength + 8) {
                    return bodyLength + 8
                } else {
                    return 0
                }
            }
        }
    }
    get() {
        return this.easySock;
    }
}

module.exports = BaseEasySock;
