const Koa = require('koa');
const app = new Koa();
const tpl_engine = require('koa-ejs');
const koaStatic = require('koa-static');
var Router = require('koa-router');

tpl_engine(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});

router.get(/.*/, (ctx, next) => {
    ctx.render();
});

app
.use(koaStatic('./static'))
.use(router.routes())
.use(router.allowedMethods())
.listen(3000);