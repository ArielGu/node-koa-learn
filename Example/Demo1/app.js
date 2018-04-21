// const http = require('http');
// const https = require('https');
// const Koa = require('koa');
// const app = new Koa();
// http.createServer(app.callback()).listen(3000);
// https.createServer(app.callback()).listen(3001);

const Koa=require('koa');
const app=new Koa();
app.use(async(ctx,next)=>{
    const start=Date.now();
    next();
    const ms=Date.now()-start;
    ctx.set('X-Response-Time',`${ms}ms`);
});

// x-response-time
app.use(async(ctx,next)=>{
    const start=Date.now();
    next();
    const ms=Date.now()-start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// logging 
app.use(async ctx=>{
    ctx.body='Hello wold!';
});

// response
app.listen(3000,()=>{
    console.log('listen on port 3000...');
});

// 解析：

