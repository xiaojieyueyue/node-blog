const createHttpError = require('http-errors');
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/',
function(req,res,next){
    res.render('reg');
})


router.post('/',function(req,res,next){
    let data = [
        req.body.name,
        req.body.password,
        req.body.email,
        req.body.birthday,
        req.body.sex,
        req.body.path
    ]
    //查询用户是否存在
    db.query('SELECT * FROM xiaojie.user where `name`=?;', req.body.name,function(err,results,fields){
         if(results[0]){
          next(createHttpError('用户存在，请再注册一个吧'));
          //注册失败会跳到固定的失败页面，请检查用户是否存在。
        }else{
            //判断不存在后可开始注册
    let regSQL = 'INSERT INTO `xiaojie`.`user` (`name`,`password`,`email`,`sex`,`birthday`) VALUES (?,?,?,?,?);'
    
    db.query(regSQL,data,function(err,results,fields){
        if(err){
            console.log(err);
            //失败后可能出现访问网页失败的错误
        }else{
            //注册成功可跳转至成功页面
            res.render('ok')
        }
    })
        }
    })
})
module.exports = router;


