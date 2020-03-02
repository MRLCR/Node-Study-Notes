const bookFactory = (id, name) => ({
  id,
  name,  
});

const BOOKS = [
  bookFactory('01', '数学'),
  bookFactory('02', '语文'),
  bookFactory('03', '英语'),
  bookFactory('04', '物理'),
  bookFactory('05', '化学'),
  bookFactory('06', '生物'),
  bookFactory('07', '历史'),
  bookFactory('08', '地理'),
  bookFactory('09', '政治'),
];

module.exports = {
  BOOKS,
  BOOKS_IDS: BOOKS.map(({id}) => id),
}
