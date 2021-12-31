/*打开侧栏，修改侧栏宽度，主体左跨度、背景透明度*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
/*关闭侧栏，恢复原始侧栏宽度，主体左跨度、背景透明度*/
function closeNav() {
document.getElementById("mySidenav").style.width = "0";
document.getElementById("main").style.marginLeft= "0";
document.body.style.backgroundColor = "white";
}
function checkname() {
    var u = document.getElementById("regname");
    var t = document.getElementById("prompt1");
    var reg = /^[\w_-]{6,16}$/;
    if (u == null || u.value.length == 0) {
        t.innerHTML = "名字必填，不能为空";
    }
    else if (!reg.test(u.value)) {
        t.innerHTML = "任意6到16位字母数字下划线连接线";
    }
    else {
        t.innerHTML = "";
    }

}

function checkpsd1() {
    var u = document.getElementById("regpsd");
    var t = document.getElementById("prompt2");
    var reg = /^[\w_-]{6,16}$/;
    if (u == null || u.value.length == 0) {
        t.innerHTML = "密码必填，不能为空";
    }
    else if (!reg.test(u.value)) {
        t.innerHTML = "密码为任意6到16位字母数字下划线连接线";
    }
    else {
        t.innerHTML = "";
    }
}


function checkemail() {
    var u = document.getElementById("regemail");
    var t = document.getElementById("prompt4");
    var reg = /^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*?)/;
    if (u == null || u.value.length == 0) {
        t.innerHTML = "邮箱不能为空";
    }
    else if (!reg.test(u.value)) {
        t.innerHTML = "邮箱格式不对";
    }
    else {
        t.innerHTML = "";
    }

}

function checkbirthday() {
    var u = document.getElementById("birthday");
    var t = document.getElementById("prompt5");
    var reg = /^[\w_-]{6,16}$/;
    if (u == null || u.value.length == 0) {
        t.innerHTML = "生日格式为****/**/**";
    }
    else if (!reg.test(u.value)) {
        t.innerHTML = "生日格填写式不对";
    }
    else {
        t.innerHTML = "";
    }

}

function checksex() {
    var u = document.getElementById("sex");
    var t = document.getElementById("prompt6");
    var reg =  /^[\w_-]{1,16}$/;
    if (u == null || u.value.length == 0) {
        t.innerHTML = "性别填写为 男 或 女  ";
    }
    else if (!reg.test(u.value)) {
        t.innerHTML = "性别填写不对";
    }
    else {
        t.innerHTML = "";
    }

}

function checke(){
    var a = document.getElementById("regname").value;
    var b = document.getElementById("regpsd").value;
    var c = document.getElementById("regemail").value;
    var d = document.getElementById("birthday").value;


    if(!a){
        alert("请输入用户名QVQ");
        return false;
    }else if(!b){
        alert("请输入密码@V@");
        return false;
    }else if(!c){
        alert("请输入邮箱QVQ");
        return false;
    }else if(!d){
        alert("请输入生日VOV");
        return false;
    }
    return true;
}
  //回车时，默认是登陆
  function on_return(){
    if(window.event.keyCode == 13){
     if (document.all('sub')!=null){
      document.all('sub').click();
      }
   }
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