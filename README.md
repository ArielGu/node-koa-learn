# node-koa-learn

## 配置环境：

Koa依赖node v7.6.0或者ES2015及更高版本和async方法的支持

首先要在node<7.6版本的Koa中使用async方法，需要两步：

1. 需要babel转译(babel's require hook)

```javasript
require('babel-register');
// 应用的其余 require 需要被放到 hook 后面
const app = require('./app');
```

1. 使用 **transform-async-to-generator** 和 **transform-async-to-module-method** 插件来解析和转译async-function。例如在.babelrc文件中：

```json
{
  "plugins": ["transform-async-to-generator"]
}
```

## Application - 应用

一个Koa Application(简称app)是由一系列的generator中间件组成，按照顺序在栈内依次执行。如何理解
>Koa设计点是在其低级中间件层中提供高级“语法糖”

Koa提供了一种基于底层中间件编写(语法糖)的设计思路，例如(Demo1中app.js和test.js就是两种方法的对比)

```javascript
app.listen(3000);
```

其对应一下的语法糖：

```javascript
const http=require('http');
const Koa=require('koa');
const app=new Koa();
http.createServer(app.callback()).listen(3000);
```

## 中间件 - Cascader级联

解析app.js的运行过程：

当程序运行到 yield next 时，代码流会暂停执行这个中间件的剩余代码，转而切换到下一个被定义的中间件执行代码，这样切换控制权的方式，被称为 downstream，当没有下一个中间件执行 downstream 的时候，代码将会逆序执行。

```javascript
var koa = require('koa');
var app = koa();

// x-response-time
app.use(function *(next){
  // (1) 进入路由
  var start = new Date;
  yield next;
  // (5) 再次进入 x-response-time 中间件，记录2次通过此中间件「穿越」的时间
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
  // (6) 返回 this.body
});

// logger
app.use(function *(next){
  // (2) 进入 logger 中间件
  var start = new Date;
  yield next;
  // (4) 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response
app.use(function *(){
  // (3) 进入 response 中间件，没有捕获到下一个符合条件的中间件，传递到 upstream
  this.body = 'Hello World';
});

app.listen(3000);
```

>为什么中间件的执行要从上往下一层层的执行，然后再从下往上回去？

这就是为了解决复杂应用中频繁的回调而设计的级联代码，并不直接把控制权完全交给下一个中间件，而是碰到next去下一个中间件，等下面都执行完了，还会执行next以下的内容。

## Context - 上下文

Koa Context 将 node原生的 request 和 response 对象封装到单个对象中