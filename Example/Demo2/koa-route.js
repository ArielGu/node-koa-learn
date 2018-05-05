const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

let home = new Router()

// 子路由1
home.get('/', async (ctx) => {
    let html = `
    <ul>
      <li><a href="/page/helloworld/1">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
    ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async (ctx) => {
    ctx.body = '404 page!'
}).get('/helloworld/:userId', async (ctx) => {
    ctx.body = `helloworld page: ${ctx.params.userId}`
    // 注意ctx.params.userId
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})
