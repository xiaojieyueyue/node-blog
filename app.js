var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');//主页
var usersRouter = require('./routes/users');
//导入路由
var loginRouter = require('./routes/login');//登录
var regRouter = require('./routes/reg');//注册
var perusalRouter = require('./routes/perusal');//空间副页
var updataRouter = require('./routes/updata');//修改
var p1Router = require('./routes/p1');//文章
var gameRouter = require('./routes/game');//2048
var sumRouter = require('./routes/sum');//文章
var errRouter = require('./routes/err');//取代了无法跳转的报错页 500
var okRouter = require('./routes/ok');//注册成功
var lokRouter = require('./routes/lok');//登陆成功
var uokRouter = require('./routes/uok');//修改成功
var dokRouter = require('./routes/dok');//删除成功


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//配置路由规则
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/reg', regRouter);
app.use('/perusal', perusalRouter);
app.use('/updata',updataRouter);
app.use('/p1',p1Router);
app.use('/game',gameRouter);
app.use('/sum',sumRouter);
app.use('/err',errRouter);
app.use('/ok',okRouter);
app.use('/lok',lokRouter);
app.use('/uok',uokRouter);
app.use('/dok',dokRouter);




app.get('/routes/:routes',(req,res,next)=>{
  console.log(req.params.routes);
  const rs=fs.createReadStream('routes/'+req.params.routes)
  rs.pipe(res)
})
app.get('/views/:views',(req,res,next)=>{
  console.log(req.params.views);
  const rs=fs.createReadStream('views/'+req.params.views)
  rs.pipe(res)
})
//css
app.get('/public/stylesheets:stylesheets',(req,res,next)=>{
  console.log(req.params.stylesheets);
  const rs=fs.createReadStream('stylesheets/'+req.params.stylesheets)
  rs.pipe(res)
})
//js
app.get('/public/javascripts:javascripts',(req,res,next)=>{
  console.log(req.params.javascripts);
  const rs=fs.createReadStream('javascripts/'+req.params.javascripts)
  rs.pipe(res)
})
//图片
app.get('/public/img:img',(req,res,next)=>{
  console.log(req.params.img);
  const rs=fs.createReadStream('img/'+req.params.img)
  rs.pipe(res)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('err');
});

module.exports = app;
