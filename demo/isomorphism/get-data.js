const dataFactory = (type, title, content) => ({
    type,
    title,
    content,
});

/**
 * 获取随机数
 * @param {number} min 最小边界值
 * @param {number} max 最大边界值
 * @returns {number}
 */
const getRandom = (min, max) => parseInt(Math.random() * (max - min + 1) + min, 10);

let mock = [
    dataFactory(
        1,
        '这次武汉的疫情会在哪些行业带来机会？',
        '武汉加油！中国加油！~~~',
    ),
    dataFactory(
        2,
        '2020 年了，《英雄联盟》真的还火吗？',
        '希望还能有一场属于我青春的金色雨。RNG 牛逼',
    ),
    dataFactory(
        1,
        '浙江新冠病毒肺炎疫情最新情况',
        '2020 年 02 月 22 日 0 时至 24 时,「浙江」地区新增确诊病例 0 人（总计 1205 人），新增疑似病例 2 人（总计 19 人），新增死亡病例 0 人（总计 1 人），新增治愈病例 35 人（总计 745 人）。',
    ),
    dataFactory(
        3,
        '2020年前端最火的技术是什么？',
        '学生浅见：Vue3、TypeScript、flutter、Serverless、Electron 生态',
    ),
    dataFactory(
        3,
        '前端开发到底需要掌握什么？',
        '学生浅见：技术硬实力，公司需要（vue? react? node?...)和可能要使用的技术栈（flutter、electron...)。口袋技能，不错的沟通理解能力、文档归纳能力、实用的PPT制作能力。'
    ),
];

// 填充随机数
mock = mock.map((item, index) => ({
    id: index,
    likesNum: getRandom(10, 1000),
    commentNum: getRandom(1, 66),
    ...item,
}));

/**
 * 逻辑模拟单元， 获取对应的数据
 * @param {number} sort 排序 0：升序（默认） 1：降序 
 * @param {number} type 过滤条件 -> 数据类型  0: 全部（默认）
 * @returns {Array<object>}
 */
const getData = (sort = 0, {
    type = 0,
} = {}) => new Promise((resolve, reject) => {
    try {
        let res = mock;
        if (type !== 0) {
            res = res.filter((item) => item.type === type);
        }
        res = res.sort((a, b) => sort !== 0 ? b.id - a.id : a.id - b.id);
        resolve(res);
    } catch(err) {
        reject(err);
    }
})

module.exports = getData;