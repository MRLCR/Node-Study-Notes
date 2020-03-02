
const directiveFactory = (name, dec) => ({name, dec});

const map = new Map([
    [0, directiveFactory('scissor', '剪刀')],
    [1, directiveFactory('rock', '石头')],
    [2, directiveFactory('paper', '布')]
])

module.exports = map;
