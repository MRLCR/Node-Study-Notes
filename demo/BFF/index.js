const fs        = require('fs');
const koa       = require('koa');
const mount     = require('koa-mount');
const static    = require('koa-static');
const gqlHttp   = require('koa-graphql');

const template  = require('./SSR/template/index');
const rpcClient = require('./client/base');

const app = new koa();
const createPath = (path) => `${__dirname}/${path}`;

const getHtml = (path) => fs.readFileSync(createPath(`static/source/${path}`), 'utf-8')
const getTpl = (path) => template(createPath(`views/${path}`));

// 静态资源
app.use(
    static(createPath('/static/source'))
);

// api
app.use(
    mount('/api', gqlHttp({
        schema: require('./schema/index'),
    }))
)

// router
app.use(
    mount('/login', async (ctx) => {
        ctx.body = getHtml('index.html')
    })
);

app.use(
    mount('/home', async (ctx) => {
        if (!ctx.query.peopleId) {
            ctx.status = 400;
            ctx.body = 'invalid peopleId';
            return;
        }

        const result = await new Promise((resolve, reject) => {
            rpcClient.write({
                peopleId: ctx.query.peopleId,
            }, (err, data) => err ? reject(err) : resolve(data))
        });

        ctx.status = 200;
        ctx.body = getTpl('home/index.html')(result);
    })
);

app.listen(80, () => {
    console.log('listened 80');
});

module.exports = app;
