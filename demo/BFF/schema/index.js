
const fs                = require('fs');
const path              = require ('path');
const { buildSchema }   = require('graphql');

const commentClient     = require('../client/comment');
const praiseClient      = require('../client/praise');

const schema = buildSchema(
    fs.readFileSync(path.resolve(__dirname, '../protocols/comment.gql'), 'utf-8')
);

schema
    .getQueryType()
    .getFields()
    .comments
    .resolve = (source, {articleId} = {}) => new Promise((resolve, reject) => {
        console.log(articleId);
        commentClient.write({
            articleId,
        }, (err, res) => err ? reject(err) : resolve(res.comments))
    });

schema
    .getMutationType()
    .getFields()
    .praise
    .resolve = (source, {commentId} = {}) => new Promise((resolve, reject) => {
        praiseClient.write({
            commentId,
        }, (err, res) => err ? reject(err) : resolve(res.praiseNum))
    });

module.exports = schema;