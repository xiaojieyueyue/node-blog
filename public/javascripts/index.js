






/*打开侧栏，修改侧栏宽度，主体左跨度、背景透明度*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "body";
}
/*关闭侧栏，恢复原始侧栏宽度，主体左跨度、背景透明度*/
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft= "0";
	document.body.style.backgroundColor = "body";
}

/*点击特效 */
onload = function() {
  var click_cnt = 0;
  var $html = document.getElementsByTagName("html")[0];
  var $body = document.getElementsByTagName("body")[0];
  $html.onclick = function(e) {
      var $elem = document.createElement("b");
      $elem.style.color = "#E94F06";
      $elem.style.zIndex = 9999;
      $elem.style.position = "absolute";
      $elem.style.select = "none";
      var x = e.pageX;
      var y = e.pageY;
      $elem.style.left = (x - 10) + "px";
      $elem.style.top = (y - 20) + "px";
      clearInterval(anim);


      switch (++click_cnt) {
          case 2:
              $elem.innerText = "OωO";
              break;
          case 4:
              $elem.innerText = "(๑•́ ∀ •̀๑)";
              break;
          case 6:
              $elem.innerText = "(≧∇≦)ﾉ欢迎来到我的空间哦";
              break;
          case 8:
              $elem.innerText = "( ＾∀＾）／欢迎＼( ＾∀＾）";
              break;
          case 10:
              $elem.innerText = "♪(´∇`*)";
              break;
          case 12:
              $elem.innerText = "OVO";
              break;
          case 14:
              $elem.innerText = "（。＾▽＾）";
              break;
          case 16:
              $elem.innerText = "ヾ(＠⌒ー⌒＠)ノ";
              break;
          case 18:
              $elem.innerText = "(((o(*ﾟ▽ﾟ*)o)))";
              click_cnt = 0;
              break;
          case 100:
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
              $elem.innerText = "ᕕ( ᐛ )ᕗ";
              break;
          default:
              $elem.innerText = "富强，民主，文明，和谐";
              break;
      }
      $elem.style.fontSize = Math.random() * 10 + 20 + "px";
      var increase = 0;
      var anim;
      setTimeout(function() {
          anim = setInterval(function() {
              if (++increase == 150) {
                  clearInterval(anim);
                  $body.removeChild($elem);
              }
              $elem.style.top = y - 20 - increase + "px";
              $elem.style.opacity = (150 - increase) / 120;
          }, 8);
      }, 70);
      $body.appendChild($elem);
  };
};