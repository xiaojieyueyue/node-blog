var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/',(reg,res,next)=>{
  let data = {
    p:"1、生活于我们，是一道绚丽的风景，而经历，恰似一把锁，锁着风轻云淡，锁着或悲或喜，锁着无奈和忧郁......",
    p2:"2、现实是残酷的，但是，在执着的人面前，希望之门似乎永远也无法合上。对于人生来说，经历，尤其是那么痛苦的经历，永远是一笔巨大的财富。",
    p3:"3、心净，是意识的洗礼;心静，是思想的铸造;心境，是灵魂的成熟。",
    p4:"4、生活需要我们不断地去学会做人，但做人有时候却让我们在生活中永远也读不懂它。这就要我们一生都要学做人，并且仍是要做到善良与平淡才是最真。",
    p5:"5、学会改变生活，学会品味沧桑，方可无悔青春，无憾岁月的消逝。",
    p6:"6、一般说，浓到好处，不易;不过，淡而韵味犹存，似乎更难。",
    p7:"7、生活那么美好，我们没有必要把自己的精力和时间浪费在无聊的斤斤计较上。多一点宽容，就少一份纷争;多一点宽容，就少一份痛苦;多一点宽容，就多一份理解;多一点宽容，就多一份美好。",
    p8:"8、人这一辈子真的不长，每个人都应该为自己而活。活的靓丽，活的潇洒。让脚步像风一样，让心灵像海一样，让头脑像光一样。",
    p9:"9、如果你心中有痛苦，不仿常去看流星，也许痛苦会随着流星划过长空的瞬间减轻;如果你心中有忧愁，不仿常挥毫泼墨，也许忧愁会随着一笔一画浸入墨香;如果你遇到了挫折，不仿常去看大海，畅游在浅海里，也许挫折会随着溅起的美丽浪花溶入大海;如果你陷入困境，不仿抚琴一曲，也许优美的音符会把你带入佳境。",
    p10:"10、如果生活捉弄了你，只要你坚定信念，生命的长河中一定会激起绚丽多彩的浪花;如果生活捉弄了你，那么人生的航程一定要拒绝让步;如果生活捉弄了你，一定要高扬起生活的风帆勇往直前，风雨过后一定有彩虹。",
    p11:"11、人生最大的敌人，莫过于我们的性格与思维习惯。",
    p12:"12、善良和善感在人生的答卷上也会涂上几笔，起码是得一个甲加，在物欲洪流的大视野里，泾渭分明，条理清晰。",
    p13:"13、生活路上，总是充满着这样或那样的挑战，你若不坚强，没人帮你分担，你若不努力，没人给你让路。你若不自信，没人替你勇敢。",
    p14:"14、生活那么复杂，人生的每一步，都可能成为一个错误，但我们却不能因为错误而不迈出下一步。经历的人，走过的路，都会成为你的风景，而磨难将成为你生命中永远丰盈的泉。",
    p15:"15、人生在世，短短数寸光阴，有时忽如一梦，醒来才发现几十年的光阴已走到了尽头，但梦是否有一个完善的尽头，恐怕只有自己知道。",
    p16:"16、哪怕身份卑微、地位低下，我们都应该相互尊重;人人生而平等，天赋人权，我们都有自由和民主。",
    p17:"17、其实多难的生活并不可怕，就怕你不思进取，破罐破摔。失败也并不可怕，就怕成功不是失败的母亲。奋斗路上走的慢一点还不可怕，就怕你停滞不前，乐不思蜀。",
    p18:"18、让昨天成为今天的母亲，孕育出崭新的风景，你会发现，其实成功只是每天的一小步。",
    p19:"19、人，活在世上，都希望自己多一点友爱，多一点欢乐，而宽容正是给别人留了回味的空间，你也在感动别人的同时，收获了自己的一片蓝天。",
    p20:"20、茫茫人海，只有敢于和魔影抗争的人，生活才有滋有味。",
    
  }
  res.render('p1',data)
})

module.exports = router;
