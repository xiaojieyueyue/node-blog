var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/',(reg,res,next)=>{
     res.render('err')
})

module.exports = router;
