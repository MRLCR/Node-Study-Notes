const net = require('net');
const {getRandomBookId} = require('../code');

const socket = new net.Socket();

socket.connect({
    host: '127.0.0.1',
    port: 3000,
});

/**
 * 计数器
 * @returns {object}
 */
const count = () => {
    let num = 0;
    return {
        get() {
            return num;
        },
        add() {
            num += 1;
        }
    }
}

// 数据包序号
const currentIndex = count();

/**
 * 组装一个二进制包，默认协议内容为：1-2字节为包序号，3-6字节为包长度，后面是包内容
 * @returns {buffer}
 */
const encode = () => {
    // 内容
    const body = Buffer.alloc(2);
    const bookId = getRandomBookId();
    body.write(bookId);

    // 头内容
    const header = Buffer.alloc(6);
    header.writeInt16BE(currentIndex.get());
    header.writeInt32BE(body.length, 2);

    // 拼接数据包
    const buffer = Buffer.concat([header, body]);

    console.log(`包${currentIndex.get()}传输的课程 id 为${bookId}`);
    currentIndex.add();
    return buffer;
}

/**
 * 拆解一个二进制包
 * @param {buffer} 二进制数据包
 * @returns {object}
 */
const decode = (buffer) => {
    if (buffer instanceof Buffer) {
        const header = buffer.slice(0, 6);
        const body = buffer.slice(6);
        const index = header.readUInt16BE();

        return {
            success: true,
            data: {
                index,
                text: body.toString(),
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

// 残留的数据
let residualBuffer = null;

socket.on('data', (buffer) => {
    // 拼接残留的 buffer
    if(residualBuffer) {
        buffer = Buffer.concat([residualBuffer, buffer]);
    }

    let completeLen = 0;

    // 分包解析
    while(completeLen = checkBufferLen(buffer)) {
        const package = buffer.slice(0, completeLen);
        buffer = buffer.slice(completeLen);

        const res = decode(package);
        if (res.success) {
            console.log(`包${res.data.index}, 返回值是${res.data.text}`);
        }
    }

    residualBuffer = buffer;
});

// 是否模拟网络波动
const isRandom = true;

// 连续发出 10 个请求
for(let i = 0; i < 10; i++) {
    if (isRandom) {
        setTimeout(() => {
            socket.write(encode());
        }, Math.round(Math.random() * 1000));
    } else {
        socket.write(encode());
    }
}
