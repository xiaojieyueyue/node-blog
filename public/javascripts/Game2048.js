(function(window, document, $) {
  function Game2048(opt) {
    var prefix = opt.prefix, len = opt.len, size = opt.size, margin = opt.margin;
    var score = 0;
    var winNum = 2048;
    var isGameOver = true;
    var board = new Board(len);
    var view = new View(prefix, len, size, margin);
    view.init();
    board.onGenerate = function(e) {
      view.addNum(e.x, e.y, e.num);
    };
    board.onMove = function(e) {
      if (e.to.num >= winNum) {
        isGameOver = true;
        setTimeout(function() { view.win(); }, 300);
      }
      if (e.to.num > e.from.num) {
        score += e.to.num;
        view.updateScore(score);
      }
      view.move(e.from, e.to);
    };
    board.onMoveComplete = function(e) {
      if (!board.canMove()) {
        isGameOver = true;
        setTimeout(function() { view.over(score); }, 300);
      }
      if (e.moved) {
        setTimeout(function(){ board.generate(); }, 200);
      }
    };
    $(document).keydown(function(e) {
      if (isGameOver) {
        return false;
      }
      switch (e.which) {
        case 37: board.moveLeft();  break;
        case 38: board.moveUp();    break;
        case 39: board.moveRight(); break;
        case 40: board.moveDown();  break;
      }
    });
    function start() {
      score = 0;
      view.updateScore(0);
      view.cleanNum();
      board.init();
      board.generate();
      board.generate();
      isGameOver = false;
    }
    $('#' + prefix + '_restart').click(start);
    start();
  };
  // 数据处理
  function Board(len) {
    this.len = len;
    this.arr = [];
  }
  Board.prototype = {
    // 事件
    onGenerate: function() {},
    onMove: function() {},
    onMoveComplete: function() {},
    // 创建数组
    init: function() {
      for (var arr = [], x = 0, len = this.len; x < len; ++x) {
        arr[x] = [];
        for (var y = 0; y < len; ++y) {
            arr[x][y] = 0;
          }
      }
      this.arr = arr;
    },
    // 在随机位置增加一个随机数
    generate: function() {
      var empty = [];
      for (var x = 0, arr = this.arr, len = arr.length; x < len; ++x) {
        for (var y = 0; y < len; ++y) {
          if (arr[x][y] === 0) {
            empty.push({x: x, y: y});
          }
        }
      }
      if (empty.length < 1) {
        return false;
      }
      var pos = empty[Math.floor((Math.random() * empty.length))];
      this.arr[pos.x][pos.y] = Math.random() < 0.5 ? 2 : 4;
      this.onGenerate({x: pos.x, y: pos.y, num: this.arr[pos.x][pos.y]});
    },
    // 左移
    moveLeft: function() {
      var canMove = false;
      // 从上到下，从左到右
      for (var x = 0, len = this.arr.length; x < len; ++x) {
        for (var y = 0, arr = this.arr[x]; y < len; ++y) {
          // 从 y + 1 位置开始，向右查找
          for (var next = y + 1; next < len; ++next) {
            // 如果 next 单元格是 0，找下一个不是 0 的单元格
            if (arr[next] === 0) {
              continue;
            }
            // 如果 y 数字是 0，则将 next 移动到 y 位置，然后将 y 减 1 重新查找
            if (arr[y] === 0) {
              arr[y] = arr[next];
              this.onMove({from: {x: x, y: next, num: arr[next]}, to: {x: x, y: y, num: arr[y]}});
              arr[next] = 0;
              canMove = true;
              --y;
            // 如果 y 与 next 单元格数字相等，则将 next 移动并合并给 y
            } else if (arr[y] === arr[next]) {
              arr[y] += arr[next];
              this.onMove({from: {x: x, y: next, num: arr[next]}, to: {x: x, y: y, num: arr[y]}});
              arr[next] = 0;
              canMove = true;
            }
            break;
          }
        }
      }
      this.onMoveComplete({moved: canMove});
    },
    moveRight: function() {
      var moved = false;
       for (var x = 0, len = this.arr.length; x < len; ++x) {
        for (var y = len - 1, arr = this.arr[x]; y >= 0; --y) {
          for (var prev = y - 1; prev >= 0; --prev) {
            if (arr[prev] === 0) {
              continue;
            }
            if (arr[y] === 0) {
              arr[y] = arr[prev];
              this.onMove({from: {x: x, y: prev, num: arr[prev]}, to: {x: x, y: y, num: arr[y]}});
              arr[prev] = 0;
              moved = true;
              ++y;
            } else if (arr[y] === arr[prev]) {
              arr[y] += arr[prev];
              this.onMove({from: {x: x, y: prev, num: arr[prev]}, to: {x: x, y: y, num: arr[y]}});
              arr[prev] = 0;
              moved = true;
            }
            break;
          }
        }
      }
      this.onMoveComplete({moved: moved});
    },
    moveUp: function() {
      var canMove = false;
      for (var arr = this.arr, len = arr.length, y = 0; y < len; ++y) {
        for (var x = 0; x < len; ++x) {
          for (var next = x + 1; next < len; ++next) {
            if (arr[next][y] === 0) {
              continue;
            }
            if (arr[x][y] === 0) {
              arr[x][y] = arr[next][y];
              this.onMove({from: {x: next, y: y, num: arr[next][y]}, to: {x: x, y: y, num: arr[x][y]}});
              arr[next][y] = 0;
              canMove = true;
              --x;
            } else if (arr[x][y] === arr[next][y]) {
              arr[x][y] += arr[next][y];
              this.onMove({from: {x: next, y: y, num: arr[next][y]}, to: {x: x, y: y, num: arr[x][y]}});
              arr[next][y] = 0;
              canMove = true;
            }
            break;
          }
        }
      }
      this.onMoveComplete({moved: canMove});
    },
    moveDown: function() {
      var canMove = false;
      for (var arr = this.arr, len = arr.length, y = 0; y < len; ++y) {
        for (var x = len - 1; x >= 0; --x) {
          for (var prev = x - 1; prev >= 0; --prev) {
            if (arr[prev][y] === 0) {
              continue;
            }
            if (arr[x][y] === 0) {
              arr[x][y] = arr[prev][y];
              this.onMove({from: {x: prev, y: y, num: arr[prev][y]}, to: {x: x, y: y, num: arr[x][y]}});
              arr[prev][y] = 0;
              canMove = true;
              ++x;
            } else if (arr[x][y] === arr[prev][y]) {
              arr[x][y] += arr[prev][y];
              this.onMove({from: {x: prev, y: y, num: arr[prev][y]}, to: {x: x, y: y, num: arr[x][y]}});
              arr[prev][y] = 0;
              canMove = true;
            }
            break;
          }
        }
      }
      this.onMoveComplete({moved: canMove});
    },
    canMove: function() {
      for (var x = 0, arr = this.arr, len = arr.length; x < len; ++x) {
        for (var y = 0; y < len; ++y) {
          if (arr[x][y] === 0) {
            return true;
          }
          var curr = arr[x][y], right = arr[x][y + 1];
          var down = arr[x + 1] ? arr[x + 1][y] : null;
          if (right === curr || down === curr) {
            return true;
          }
        }
      }
      return false;
    }
  };
  // 视图处理
  function View(prefix, len, size, margin) {
    this.prefix = prefix;
    this.len = len;             // 单元格单边的数量（实际数量 len * len）
    this.size = size;	        // 每个单元格的边长
    this.margin = margin;	// 每个单元格的间距
    this.score = $('#' + prefix + '_score');
    this.container = $('#' + prefix + '_container');
    var containerSize = len * size + margin * (len + 1);
    this.container.css({width:containerSize , height: containerSize});
    this.nums = {};
  }
  View.prototype = {
    // 计算位置
    getPos: function(n) {
      return this.margin + n * (this.size + this.margin);
    },
    init: function() {
      for (var x = 0, len = this.len; x < len; ++x) {
        for (var y = 0; y < len; ++y) {
          var $cell = $('<div class="' + this.prefix + '-cell"></div>');
          $cell.css({
              width: this.size + 'px', height: this.size + 'px', 
              top: this.getPos(x), left: this.getPos(y)
          }).appendTo(this.container);
        }
      }
    },
    addNum: function(x, y, num) {
      var $num = $('<div class="' + this.prefix + '-num ' + this.prefix + '-num-' + num + ' ">');
      $num.text(num).css({
        top: this.getPos(x) + parseInt(this.size / 2),
        left: this.getPos(y) + parseInt(this.size / 2)
      }).appendTo(this.container).animate({
        width: this.size + 'px',
        height: this.size + 'px',
        lineHeight: this.size + 'px',
        top: this.getPos(x),
        left: this.getPos(y)
      }, 100);
      this.nums[x + '-' + y] = $num;
    },
    move: function(from, to) {
      var fromIndex = from.x + '-' + from.y, toIndex = to.x + '-' + to.y;
      var clean = this.nums[toIndex];
      this.nums[toIndex] = this.nums[fromIndex];
      delete this.nums[fromIndex];
      var prefix = this.prefix + '-num-';
      var pos = {top: this.getPos(to.x), left: this.getPos(to.y)};
      this.nums[toIndex].finish().animate(pos, 200, function() {
        if (to.num > from.num) {
          clean.remove();
          $(this).text(to.num).removeClass(prefix + from.num).addClass(prefix + to.num);
        }
      });
    },
    updateScore: function(score) {
      this.score.text(score);
    },
    win: function() {
      $('#' + this.prefix + '_over_info').html('<p>您获胜了</p>');
      $('#' + this.prefix + '_over').removeClass(this.prefix + '-hide');
    },
    over: function(score) {
      $('#' + this.prefix + '_over_info').html('<p>本次得分</p><p>' + score + '</p>');
      $('#' + this.prefix + '_over').removeClass(this.prefix + '-hide');
    },
    cleanNum: function() {
      this.nums = {};
      $('#' + this.prefix + '_over').addClass(this.prefix + '-hide');
      $('.' + this.prefix + '-num').remove();
    }
  };
  window['Game2048'] = Game2048;
})(window, document, jQuery);
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