#!/usr/bin/env node

// 指令库
const directiveLib = ['scissor', 'rock', 'paper'];

// 玩家出拳
const playerAction = process.argv[process.argv.length - 1];
console.log('player input: ', playerAction);

// 合法输入校验
if (!directiveLib.includes(playerAction)) {
    console.log(`error: 非法输入\n需要输入${directiveLib.join('、')}中的一个`);
    return;
}

// 玩家出拳的序列号
let playerActionIndex = 0;
directiveLib.forEach((item, index) => {
    if (item === playerAction) {
        playerActionIndex = index;
    }
});

// 电脑出拳
const computerActionIndex = Math.floor(Math.random() * 3);
const computerAction = directiveLib[computerActionIndex];
// 猜拳规则
const rules = (user1, user2) => {
    if (user1 === user2) {
        return '平';
    } else if (user1 - user2 === 1 || user2 - user1 === directiveLib.length - 1) {
        return '赢';
    }
    return '输';
};
// 获取结果
const result = `你出: ${playerAction}, 电脑出: ${computerAction}, 结果: ${rules(playerActionIndex, computerActionIndex)}`;

console.log(result);
