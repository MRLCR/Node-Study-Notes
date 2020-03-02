const fs        = require('fs');
const path      = require('path');
const protobuf  = require('protocol-buffers');

const articleMockData = require('./mock/article');

const praiseSchemas = protobuf(
    fs.readFileSync(path.resolve(__dirname, '../protocols/praise.proto'))
);

const server = require('./lib/common-server')(praiseSchemas.PraiseRequest, praiseSchemas.PraiseResponse);

server
    .createServer((request, response) => {
        console.log('body', request.body);
        const commentId = request.body.commentId;
        const comment = articleMockData.comments.find(comment => comment.id == commentId);
        let praiseNum = null;

        if (comment) {
            comment.praiseNum++;
            praiseNum = comment.praiseNum;
        }
        response.end({
            commentId,
            praiseNum,
        });
    })
    .listen(4002, ()=> {
        console.log('rpc server listened: 4002')
    });