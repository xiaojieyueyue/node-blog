const createHttpError = require('http-errors');
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/',
function(req,res,next){
    res.render('updata');
})//get收到后开始执行下面代码


router.post('/',function(req,res,next){
    let data = [
        req.body.name,
        //这里的req.body照写后面接html的name里的字符
        req.body.password,
        req.body.email,
        req.body.birthday,
        req.body.sex
    ]//这里是修改语句
    let regSQL = 'update xiaojie.user set name=?,password=?,email=?,birthday=?,sex=? where id=1'
    //指定id为1的用户修改
    // let sql = 'update book set name=?,author=?,category=?,description=? where id=?';

    db.query(regSQL,data,function(err,results,fields){
        if(err){
            console.log(err);
        }else{
            res.render('uok')
        }
    })
        })
module.exports = router;



