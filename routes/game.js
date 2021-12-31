var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/',(reg,res,next)=>{
  let data = {
    p:"分数",
    remaker:"重新开始",
    r:"上下左右键位操作"
  }
  res.render('game',data)
})
module.exports = router;
