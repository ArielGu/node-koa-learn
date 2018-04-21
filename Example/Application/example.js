var simpleKoa=require('./application2');
let app=new simpleKoa();

// app.use((req,res)=>{
//     res.writeHead(200);
//     res.end('hello world');
// });

app.use(async (ctx)=>{
    ctx.body='hello'+ctx.query.name;
});

app.listen(3000,()=>{
    console.log('listening on 3000');
})

// 思考改进点：
//app.use中传入的回调函数参数res，req(node原生的request和response对象)
//=>构造context对象，request对象(对原生request的封装)，response对象
