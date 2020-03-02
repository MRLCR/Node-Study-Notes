const http  = require('http');
const fs    = require('fs');
const url   = require('url');

const {playGame} = require('./action');

// 格式化响应报文
const toJson = (success, message, data) => (JSON.stringify({success, message, data}));

// 响应静态资源
const responseStaticFile = (res, url = 'index.html') => {
    fs.createReadStream(__dirname + url, 'utf8').pipe(res);
}

/**
 * 生产路由内容
 * @param {string} url 访问路径
 * @param {function} callback 响应
 * @returns {object}
 */
const routerFactory = (url, callback) => {
    if (typeof callback === 'undefined') {
        callback = (req, res) => {
            responseStaticFile(res, url === '/' ? '/index.html' : url);
        }
    }
    return {
        url,
        callback,
    }
}

/**
 * 路由
 */
const routers = [
    routerFactory('/favicon.ico', (req, res) => {
        res.end();
    }),
    routerFactory('/'),
    routerFactory('/index.js'),
    routerFactory('/index.css'),
    routerFactory('/api/getResut', (req, res) => {
        const { query } = url.parse(req.url, true);
        if (query.action) {
            const result = playGame(Number(query.action).valueOf());
            res.write(toJson(true, '游戏有结果了', result));
            res.end();
        } else {
            res.write(toJson(false, '请出拳'));
            res.end();
        }
    }),
];

/**
 * 是否为 api 请求
 * @param {string} url 页面路径
 * @returns {boolean}
 */
const isApiRequest = (url) => typeof url === 'string' && url.includes('/api/');

http
    .createServer(function(req, res) {
        const parseUrl = url.parse(req.url);
        routers.forEach(({url, callback}) => {
            if (parseUrl.pathname === url) {
                const options = {
                    charset: 'utf-8',
                };
                if (isApiRequest(url)) {
                    options['Content-Type'] = 'application/json';
                }
                res.writeHead(200, options);
                try {
                    typeof callback === 'function' && callback(req, res);
                } catch (e) {
                    res.writeHead(500);
                    console.error(e);
                    res.end();
                }
            }
        });
    })
    .listen(3000);
