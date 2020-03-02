const fs        = require('fs');
const path      = require('path');
const protobuf  = require('protocol-buffers');

const articleMockData = require('./mock/article');

const commentSchemas = protobuf(
    fs.readFileSync(path.resolve(__dirname, '../protocols/comment.proto'))
);

const server = require('./lib/common-server')(commentSchemas.CommentsRequest, commentSchemas.CommentsResponse);

server
    .createServer((request, response) => {
        const query = request.body;
        const articleId = query.articleId;
        // 逻辑处理 这里简化就先不处理了

        response.end({
            comments: articleMockData.comments
        });
    })
    .listen(4001, ()=> {
        console.log('rpc server listened: 4001')
    });