const directiveLib = require('./directiveLib');

/**
 * 模拟计算机的出拳
 * @returns {number}
 */
const createComputerAction = () => Math.floor(Math.random() * 3);

/**
 * 对决规则
 * @param {number} user1 用户1出拳
 * @param {number} user2 用户2出拳
 * @returns {string}
 */
const rules = (user1, user2) => {
    if (user1 === user2) {
        return '平';
    } else if (user1 - user2 === 1 || user2 - user1 === directiveLib.size - 1) {
        return '赢';
    }
    return '输';
}

/**
 * 游戏对决
 * @param {number} userAction 用户出拳
 * @returns {object | string}
 */
const battle = (userAction) => {
    if (directiveLib.has(userAction)) {
        const computerAction = createComputerAction();
        const result = rules(userAction, computerAction);
        const getDec = (directive) => directiveLib.get(directive).dec;
        const userActionDec = getDec(userAction)
        const computerActionDec = getDec(computerAction);
        return {
            userActionDec,
            computerActionDec,
            result,
        };

    } else {
        return '你作弊，不能这么出拳';
    }
}

module.exports = battle;
