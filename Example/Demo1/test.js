const http=require('http');
// const Koa=require('koa');
// const app=new Koa();
// http.createServer(app.callback()).listen(3000);
http.createServer((req,res)=>res.end('Hello World'))
    .listen(3000,()=>{
        console.log('listen on 3000...');
    });

//其中app.callback()返回适用于http.createServer()方法回调函数来处理请求，
//你也可以使用此回调函数将 koa 应用程序挂载到 Connect/Express 应用程序中。