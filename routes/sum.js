var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/',(reg,res,next)=>{
  let data = {
    test:"test"  }
  res.render('sum',data)
})

module.exports = router;
