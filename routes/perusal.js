
/* GET home page. */
const createHttpError = require('http-errors');
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/',
function(req,res,next){
    res.render('perusal');
})


router.post('/',function(req,res,next){
    let data = [
        req.body.name
    ]
    //删除语句，我是根据用户名删除，这样方便用户精确删除或者说是注销自己的账号
    let regSQL = ' DELETE FROM xiaojie.user where `name`=?;'
    // let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
    db.query(regSQL,data,function(err,results,fields){
        if(err){
            console.log(err);
        }else{
            res.render('dok')
        }
    })
        })
module.exports = router;



