const fs        = require('fs');
const path      = require('path');
const protobuf  = require('protocol-buffers');

const userMockData = require('./mock/user');
const articleMockData = require('./mock/article');
const schemas = protobuf(
    fs.readFileSync(path.resolve(__dirname, '../protocols/home.proto'))
);

const server = require('./lib/common-server')(schemas.HomeRequest, schemas.HomeResponse);

server
    .createServer((request, response) => {
        const query = request.body;
        const peopleId = query.peopleId;
        const userData = userMockData.find((item) => item.peopleId === peopleId) || userMockData[0];

        // 直接返回假数据
        response.end({
            user: userData,
            article: articleMockData,
        });
    })
    .listen(4000, ()=> {
        console.log('rpc server listened: 4000')
    });