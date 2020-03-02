const net = require('net');

class RPC {
    constructor({ encodeResponse, decodeRequest, isCompleteRequest } = {}) {
        this.encodeResponse = encodeResponse;
        this.decodeRequest = decodeRequest;
        this.isCompleteRequest = isCompleteRequest;
    }
    createServer(callback) {
        const tcpServer = net.createServer((socket) => {
            let residualBuffer = null;
            socket.on('data', (buffer) => {

                // 拼接残留的 buffer
                if (residualBuffer) {
                    buffer = Buffer.concat([residualBuffer, buffer]);
                }
                
                let completeLen = null;
        
                // 分包解析
                while(buffer && (completeLen = this.isCompleteRequest(buffer))) {

                    let requestBuffer = null;
                    if (completeLen === Number(buffer.length)) {
                        requestBuffer = buffer;
                        buffer = null;
                    } else {
                        requestBuffer = buffer.slice(0, completeLen);
                        residualBuffer = buffer.slice(completeLen);
                    }

                    const request = this.decodeRequest(requestBuffer);
                    callback(
                        { // request
                            body: request.result,
                            socket
                        },
                        { // response
                            end: (data) => {
                                const buffer = this.encodeResponse(data, request.seq)
                                socket.write(buffer);
                            }
                        }
                    );
                }
            });
        });

        return {
            listen() {
                tcpServer.listen.apply(tcpServer, arguments)
            }
        }
    }
}

module.exports = RPC;
