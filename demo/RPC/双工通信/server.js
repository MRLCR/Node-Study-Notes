const net = require('net');
const {searchBookName} = require('../code');

/**
 * 组装一个二进制包
 * @param {string} index 包序号
 * @param {string} data 包内容
 * @returns {buffer}
 */
const encode = (index, data) => {
    const body = Buffer.from(data);
    const header = Buffer.alloc(6);
    header.writeInt16BE(index);
    header.writeInt32BE(body.length, 2);

    return Buffer.concat([header, body]);
}

/**
 * 拆解一个二进制包
 * @param {buffer} 二进制数据包
 * @returns {object}
 */
const decode = (buffer) => {
    if (buffer instanceof Buffer) {
        const header = buffer.slice(0, 6);
        const index = header.readUInt16BE();
        const body = buffer.slice(6).toString();

        return {
            success: true,
            data: {
                index,
                text: body,
            }
        }
    }
    return {
        success: false,
        message: '数据包格式不正确',
    }
}

/**
 * 检查获取一个包的长度，默认公示为：头部长度（6）+ 存储在头部的包长度
 * 如果长度小于6，则说明被拆包，需要与下个包数据拼接使用，故返回 0 。
 * @param {buffer} buffer
 * @returns {number}
 */
const checkBufferLen = (buffer) => {
    if (buffer instanceof Buffer) {
        // 头部信息不全时，可能是因为内容超长被拆包了
        if (buffer.length < 6) {
            return 0;
        }
        const length = 6 + buffer.readInt32BE(2);
        return buffer.length >= length ? length : 0;
    }
    return 0;
}

// 是否模拟网络波动
const isRandom = true;

const server = net.createServer((socket) => {
    let residualBuffer = null;
    socket.on('data', (buffer) => {

        // 拼接残留的 buffer
        if (residualBuffer) {
            buffer = Buffer.concat([residualBuffer, buffer]);
        }
        
        let completeLen = 0;

        // 分包解析
        while(completeLen = checkBufferLen(buffer)) {
            const package = buffer.slice(0, completeLen);
            buffer = buffer.slice(completeLen);

            const res = decode(package);
            if (res.success) {
                if(isRandom) {
                    setTimeout(() => {
                        socket.write(
                            encode(res.data.index, searchBookName(res.data.text))
                        );
                    }, Math.round(Math.random() * 1000));
                } else {
                    socket.write(
                        encode(res.data.index, searchBookName(res.data.text))
                    )
                }
            }
        }

        residualBuffer = buffer;
    });
});

server.listen(3000);
