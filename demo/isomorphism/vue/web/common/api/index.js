
// 篡改路由但不刷新
export const changeUrlQuery = (sort = 0, type = 0) => {
    try {
        if (window) {
            window.history.pushState(null, '', `${window.location.pathname}?sort=${sort}&type=${type}`);
        }
    } catch (err) {
        throw err;
    }
}

// 获取数据
export const getData = (sort = 0, type = 0) => (
    fetch(`./api?sort=${sort}&type=${type}`)
        .then(data => data.json())
        .then(data => {
            changeUrlQuery(sort, type);
            return data;
        })
);
