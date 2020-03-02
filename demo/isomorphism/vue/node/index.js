const fs                = require('fs');
const path              = require('path');
const Koa               = require('koa');
const mount             = require('koa-mount');
const static            = require('koa-static');
const VueServerRenderer = require('vue-server-renderer');
const getData           = require('../../get-data');
const clientManifest    = require('../dist/vue-ssr-client-manifest.json')
const serverBundle      = require('../dist/vue-ssr-server-bundle.json');

const app = new Koa();
const { createBundleRenderer } = VueServerRenderer;
const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

app.use(
    mount('/dist', static(`${__dirname}/../dist`)),
);

app.use(
    mount('/api', async (ctx) => {
        const {query = {}} = ctx;
        const sort = Number.isNaN(Number(query.sort)) ? 0 : Number(query.sort);
        const type = Number.isNaN(Number(query.type)) ? 0 : Number(query.type);
        ctx.body = await getData(sort, {type});
    }),
)

app.use(async (ctx) => {
    if (ctx.url === '/favicon.ico' || ctx.url.indexOf('/dist') >= 0) {
        ctx.status = 200;
        ctx.body = '';
        return;
    }
    const {query = {}} = ctx;
    const sort = Number.isNaN(Number(query.sort)) ? 0 : Number(query.sort);
    const type = Number.isNaN(Number(query.type)) ? 0 : Number(query.type);
    const data = await getData(sort, {type});

    ctx.status = 200;

    try {
        const renderer = createBundleRenderer(serverBundle, {
            runInNewContext: false,
            template,
            clientManifest,
        });
        renderer.renderToString({
            data: {
                list: data,
                sort,
                type,
                sortFn: () => null,
                filtFn: () => null,
            },
            initData: {
                list: data,
                sort,
                type,
            },
        }, (err, html) => {
            if (err) {
                console.log('throw this error');
                throw err;
            }
            ctx.body = html;
        })
    } catch (err) {
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log('listened 3000');
});
