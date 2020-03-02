const Koa               = require('koa');
const mount             = require('koa-mount');
const static            = require('koa-static');
const ReactDomServer    = require('react-dom/server');

const getData           = require('../../get-data');

// 解析 .jsx 文件
require('@babel/register')({
    presets: ['@babel/preset-react']
});

const App       = require('./index.jsx');
const template  = require('../../template/index')(`${__dirname}/index.html`);
const app       = new Koa();

// 静态资源
app.use(
    mount('/static', static(`${__dirname}/source`)),
)
// api 接口模拟
app.use(
    mount('/api', async (ctx) => {
        const {query = {}} = ctx;
        const sort = Number.isNaN(Number(query.sort)) ? 0 : Number(query.sort);
        const type = Number.isNaN(Number(query.type)) ? 0 : Number(query.type);
        ctx.body = await getData(sort, {type});
    })
)

app.use(async (ctx) => {
    if (ctx.url === '/favicon.ico') {
        ctx.status = 200;
        ctx.body = '';
        return;
    }
    const {query = {}} = ctx;
    const sort = Number.isNaN(Number(query.sort)) ? 0 : Number(query.sort);
    const type = Number.isNaN(Number(query.type)) ? 0 : Number(query.type);
    const data = await getData(sort, {type});

    ctx.status = 200;
    // 将数据注入到模板中，字段与模板存在耦合
    try {
        ctx.body = template({
            stringRenderedByNode: ReactDomServer.renderToString(
                App(data, sort, {type}),
            ),
            sort,
            type,
            reactData: data,
        });   
    } catch (err) {
        console.log(err);
    }
})

app.listen(3000, () => {
    console.log('listened 3000');
});
