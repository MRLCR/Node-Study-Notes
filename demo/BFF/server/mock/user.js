const userFactory = (
    id,
    peopleId,
    nickname,
    labels,
    introduction,
) => ({
    id,
    peopleId,
    nickname,
    labels: labels.join('/'),
    introduction,
});

module.exports = [
    userFactory(
        0,
        0,
        '匿名',
        [],
        '',
    ),
    userFactory(
        1,
        101,
        '隔壁的小林',
        ['前端小白', '帅气的小伙', '游戏控', '快乐宅'],
        '喜欢科技感，研究学习新知识新技术，乐于参与讨论大脑风暴，爱打球',
    ),
    userFactory(
        2,
        102,
        '小黑',
        ['楼下', '全能'],
        '重装系统请 call 我， 电话：110',
    ),
    userFactory(
        3,
        103,
        '兔子',
        ['小钱钱', '种花家'],
        '此生无悔种花家',
    ),
];
