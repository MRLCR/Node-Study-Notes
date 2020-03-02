const userList = require('./user');

const ARTICLE_ID = 1;
const getRanDomUser = () => userList[Math.floor(Math.random() * userList.length)];

const commentsFactory = (
    id,
    content = '',
) => ({
    id,
    articleId: ARTICLE_ID,
    user: getRanDomUser(),
    content,
    praiseNum: Math.floor(Math.random() * 10),
});

module.exports = {
    id: ARTICLE_ID,
    content: '这是一篇很棒的文章，你最好要点赞',
    comments: [
        commentsFactory(1, '可以的'),
        commentsFactory(2, '666'),
        commentsFactory(3, '奥利给'),
    ],
};
