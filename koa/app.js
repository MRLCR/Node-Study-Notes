const http = require('http');
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url}: ${rt}`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(async (ctx) => {
    if (ctx.url !== '/') {
        ctx.throw(404, '404哦');
    } else {
        ctx.body = "Hello Koa";
    }
});

app.on('error', (err, ctx) => {
    console.log(err);
})

// app.listen(3000);
http.createServer(app.callback()).listen(3000);
