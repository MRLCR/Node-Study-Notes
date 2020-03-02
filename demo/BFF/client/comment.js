const path          = require('path');
const BaseEasySock  = require('./base');

const easySock = new BaseEasySock({ 
    ip: '127.0.0.1',
    port: 4001,
    timeout: 500,
    keepAlive: true
});

easySock.init(
    path.resolve(__dirname, '../protocols/comment.proto'),
    'CommentsRequest',
    'CommentsResponse',
);

module.exports = easySock.get();
