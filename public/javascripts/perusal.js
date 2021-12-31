// 当网页向下滑动 20px 出现"返回顶部" 按钮
window.onscroll = function() {scrollFunction()};
 
function scrollFunction() {console.log(121);
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
 
// 点击按钮，返回顶部
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
/*日历*/
window.onload=function(){
    var form = document.getElementById('calendar');
    // 通过日历对象去调用自身的init方法
    calendar.init(form);
  }
  var calendar = {
    year: null,
    month: null,
    //日的数组
    dayTable: null,
    //初始化函数
    init(form) {
      // 1获取日数组
      this.dayTable=form.getElementsByTagName('td');
      //2创建日历,传入当前时间
      this.createCalendar(form,new Date());
      var nextMon=form.getElementsByTagName('th')[2];
      var preMon=form.getElementsByTagName('th')[0];
      preMon.onclick=function(){
      calendar.clearCalendar(form)
        var preDate=new Date(calendar.year,calendar.month-1,1);
        calendar.createCalendar(form,preDate)
      }
      nextMon.onclick=function(){
        calendar.clearCalendar(form)
        var nextDate=new Date(calendar.year,calendar.month+1,1);
        calendar.createCalendar(form,nextDate)
      }
    },
    //清除日历数据
    clearCalendar(form){
      var tds=form.getElementsByTagName('td');
      for (var i = 0; i < tds.length; i++) {
        tds[i].innerHTML='&nbsp';
        // 清除今天的样式
        tds[i].id='';
      }
    },
    // 3生成日历
    // from table表格 date要创建的日期
    createCalendar(form,date){
      //获取此时的年份
       this.year=date.getFullYear(); 
       //获取此时的月份
       this.month=date.getMonth();

       //年份月份写入日历
       form.getElementsByTagName('th')[1].innerHTML = this.year+"年"+(this.month+1)+"月";
       //获取本月的天数
       var dataNum=this.getDateLen(this.year,this.month);
       var fristDay = this.getFristDay(calendar.year,calendar.month);
      // 循环将每一天的天数写入到日历中
      // 让i表示日期。
      for (var i = 1; i <= dataNum; i++) {
        this.dayTable[fristDay+i-1].innerHTML=i;
        var nowDate =new Date();
        if(i ==nowDate.getDate() && calendar.month ==nowDate.getMonth()&&calendar.year == nowDate.getFullYear()){
          //  将当期元素的id设置为today
          calendar.dayTable[i+fristDay-1].id = "today";
        }
      }
    },
     // 获取本月份的天数
     getDateLen(year,month){
      //获取下个月的第一天
      var nextMonth=new Date(year,month+1,1);
      // 设置下月第一天的小时-1，也就是上个月最后一天的小时数，随便减去一个值不要超过24小时
      nextMonth.setHours(nextMonth.getHours()-1);
      //获取此时下个月的日期,就是上个月最后一天.
      return nextMonth.getDate();
     },
     // 获取本月第一天为星期几。
    getFristDay:function(year,month){
      var fristDay=new Date(year,month,1);
      return fristDay.getDay();
    }
  } 


  window.addEventListener('load', function () {
    //1. 获取元素
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var banners = document.querySelector('.banners')

    //2. 鼠标经过，显示左右按钮
    banners.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null;//清除计时器
    });
    //3. 鼠标离开，隐藏左右按钮
    banners.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            // 轮播图自动切换 相当于点击右箭头
            next.click();
        }, 2000);
    });
    // 4. 动态生成小圆圈 有几张图片，就生成几个小圆圈
    var images = document.querySelector('.images');
    var dots = document.querySelector('.dots');
    var banners_width = banners.offsetWidth;
    for (var i = 0; i < images.children.length; i++) {
        //创建一个小li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过创建自定义属性来做
        li.setAttribute('index', i);
        dots.appendChild(li);
        //5. 小圆圈的排他思想 可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            for (var i = 0; i < dots.children.length; i++) {
                dots.children[i].className = '';
            }
            this.className = 'active';
            // 6. 点击小圆圈，移动图片，本质移动的是ul
            //ul 的移动距离 就是小圆圈的索引号 * 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到它的index属性
            var index = this.getAttribute('index');
            //当我们点击了某个小li 就要把这个小li 的index给num
            num = index;
            circle = index;
            animate(focus, -index * banners_width);
        })
    }
    //把dots 里面的第一个小li设置类名为 active
    dots.children[0].className = 'active';
    // 实现滑动到最后一张照片时 可以平滑地过渡到第一张，克隆第一张图片 放在ul最后面，在其后克隆小圆点不会多
    var first = images.children[0].cloneNode(true);
    images.appendChild(first);

    // 点击右侧按钮，图片滚动一张
    var num = 0;
    //circle 控制小圆圈的播放
    var circle = 0;
    next.addEventListener('click', function () {
        // 如果走到了最后复制的一张图片，此时的ul要快速复原 left值改为零
        if (num == images.children.length - 1) {
            images.style.left = 0;
            num = 0;
        }
        num++;
        animate(images, -num * banners_width);
        // 8. 点击右侧按钮，小圆圈跟随一起变化
        circle++;
        if (circle == dots.children.length) {
            circle = 0;
        }
        circleChange();
    })
    //左侧按钮点击事件
    prev.addEventListener('click', function () {
        // 如果走到了最后复制的一张图片，此时的ul要快速复原 left值改为零
        if (num == 0) {
            num = images.children.length - 1;
            images.style.left = -num * banners_width + 'px';
        }
        num--;
        animate(images, -num * banners_width)
        // 8. 点击右侧按钮，小圆圈跟随一起变化
        circle--;
        circle = circle < 0 ? dots.children.length - 1 : circle;
        //调用函数
        circleChange();
    })
    function circleChange() {
        for (var i = 0; i < dots.children.length; i++) {
            dots.children[i].className = '';
        }
        dots.children[circle].className = 'active';
    }
    var timer = setInterval(function () {
        //手动调用点击事件
        next.click();
    }, 2000);

})

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
