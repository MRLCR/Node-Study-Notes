const fs        = require('fs');
const koa       = require('koa');
const mount     = require('koa-mount');
const static    = require('koa-static');
const gqlHttp   = require('koa-graphql');

const template  = require('./SSR/template/index');
const rpcClient = require('./client/index');

const app = new koa();
const createPath = (path) => `${__dirname}/${path}`;

// 未优化的
// const getHtml = (path) => fs.readFileSync(createPath(`static/source/${path}`), 'utf-8');
// v2 优化的
const getHtmlBuffer = (path) => fs.readFileSync(createPath(`static/source/${path}`));
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
/**------ 性能优化前 start -------*/
// app.use(
//     mount('/login', async (ctx) => {
//         ctx.body = getHtml('index.html')
//     })
// );
/**------ 性能优化前 end -------*/

/**------ 性能优化 v1 start -------*/
// const loginHtml = getHtml('index.html');
// app.use(
//     mount('/login', async (ctx) => {
//         ctx.body = loginHtml;
//     })
// );
/**------ 性能优化 v1 start -------*/

/**------ 性能优化 v2 start -------*/
const loginHtmlBuffer = getHtmlBuffer('index.html');
app.use(
    mount('/login', async (ctx) => {
        ctx.body = loginHtmlBuffer;
        ctx.status = 200;
        ctx.type = 'html';
    })
);
/**------ 性能优化 v2 start -------*/

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
