const battle = require('../code/index');

// 玩游戏
const playGame = (userAction) => battle(userAction);

module.exports = {
    playGame,
}
