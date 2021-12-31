const createHttpError = require('http-errors');
// module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/',function(req,res,next){
  let data =[
    req.body.name,
    req.body.password
  ]
  console.log(data)
  //这里也是查询并判断
  db.query('SELECT * FROM xiaojie.user where `name`=?;',req.body.name,function(err,results,fields){
    if(results[0]){
      //成功后跳转登录页
      if(results[0].password == req.body.password){
        res.render('lok')
      }else{
        next(createHttpError('密码错误。'));
      }
    }else{
      next(createHttpError('用户不存在。'))
    }
  })
});

module.exports = router;