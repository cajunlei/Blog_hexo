var ll = {
  // 调用霞鹜文楷在线字体
  lxgwWenkaiScreen: function () {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://npm.elemecdn.com/lxgw-wenkai-screen-webfont/style.css";
    document.head.append(link);
  },

  // 作者卡片问好
  authorInfoSayhi: function () {
    // 获取时间
    var getTimeState = () => {
      // 获取当前时间
      var timeNow = new Date();
      // 获取当前小时
      var hours = timeNow.getHours();
      // 设置默认文字
      var text = ``;
      // 判断当前时间段
      if (hours >= 0 && hours <= 5) {
        text = `晚安`;
      } else if (hours > 5 && hours <= 10) {
        text = `早上好`;
      } else if (hours > 10 && hours <= 14) {
        text = `中午好`;
      } else if (hours > 14 && hours <= 18) {
        text = `下午好`;
      } else if (hours > 18 && hours <= 24) {
        text = `晚上好`;
      }
      return text;
    };
    if (document.querySelector('#author-info_sayhi')) {
      document.getElementById("author-info_sayhi").innerHTML = getTimeState() + "！我是";
    }
  },

  // 作者卡片问好
  cardInfoSayhi: function () {
    fetch("https://api.vvhan.com/api/visitor.info").then((n => n.json())).then((n => {
      let t = n.time.substring(11, 13), o = -1 !== n.location.indexOf("-") ? n.location.split("-") : n.location.split(" "), i = o[o.length - 1];
      document.getElementById("author-info_sayhi").innerHTML = `<strong>${t < 5 ? "深夜了！🥱" : t < 11 ? "早上好！👋" : t < 14 ? "中午好！😄" : t < 19 ? "下午好！☕" : "晚上好！😄"} </strong><br>欢迎来自 <strong>${i}</strong> 的小伙伴。`
    })).catch((function (n) { console.log(n) }))
  },

  // 页面标题
  pageTitle: function () {
    document.getElementById('page-name-text').style.display = window.location.pathname === '/' || /^\/page\/[0-9]+\//.test(window.location.pathname)
    document.querySelector('#page-name-text').innerHTML = GLOBAL_CONFIG_SITE.title
  },

  //动态标题
  dynamicTitle: function () {
    var OriginTitile = document.title;
    var titleTime;
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        //离开当前页面时标签显示内容
        document.title = "w(ﾟДﾟ)w 不要走！再看看嘛！";
        clearTimeout(titleTime);
      } else {
        //返回当前页面时标签显示内容
        document.title = "♪(^∇^*)欢迎肥来！" + OriginTitile;
        //两秒后变回正常标题
        titleTime = setTimeout(function () {
          document.title = OriginTitile;
        }, 2000);
      }
    })
  },

  // 返回顶部显示网页阅读进度
  percent: function () {
    let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
      b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度
      result = Math.round(a / b * 100), // 计算百分比
      up = document.querySelector("#go-up") // 获取按钮
    if (result <= 95) {
      up.childNodes[0].style.display = 'none'
      up.childNodes[1].style.display = 'block'
      up.childNodes[1].innerHTML = result;
    } else {
      up.childNodes[1].style.display = 'none'
      up.childNodes[0].style.display = 'block'
    }
  },

  //跳转到指定页面
  toPage: function () {
    var e = document.querySelectorAll(".page-number"),
      t = e[e.length - 1].innerHTML,
      n = Number(t),
      a = document.getElementById("toPageText"),
      o = Number(a.value);
    if ("" != o && !isNaN(o) && o % 1 == 0) if (1 == o) document.getElementById("toPageButton").href = "/";
    else if (o > n) {
      var d = "/page/" + n + "/#home_top";
      document.getElementById("toPageButton").href = d
    } else d = "/page/" + a.value + "/#home_top",
      document.getElementById("toPageButton").href = d
  },

  //跳转到指定页面
  toPageArchive: function () {
    var e = document.querySelectorAll(".page-number"),
      t = e[e.length - 1].innerHTML,
      n = Number(t),
      a = document.getElementById("toPageText"),
      o = Number(a.value);
    if ("" != o && !isNaN(o) && o % 1 == 0) if (1 == o) document.getElementById("toPageButton").href = "/";
    else if (o > n) {
      var d = "/archives/page/" + n + "/#archive";
      document.getElementById("toPageButton").href = d
    } else d = "/archives/page/" + a.value + "/#archive",
      document.getElementById("toPageButton").href = d
  },

  //滚动到指定id
  scrollTo: function (id) {
    var domTop = document.querySelector(id).offsetTop;
    window.scrollTo(0, domTop - 80);
  },

  // 网页运行时间
  runtime: () => {
    var e = function (e) {
      return e > 9 ? e : "0" + e
    };
    let t = new Date("2021/09/25 00:00:00").getTime(),
      n = (new Date).getTime(),
      o = Math.round((n - t) / 1e3),
      l = "本站已运行：";
    o >= 86400 && (l += e(parseInt(o / 86400)) + " 天 ", o %= 86400),
      o >= 3600 && (l += e(parseInt(o / 3600)) + " 时 ", o %= 3600),
      o >= 60 && (l += e(parseInt(o / 60)) + " 分 ", o %= 60),
      o >= 0 && (l += e(o) + " 秒");
    let a = document.getElementById("runtime");
    a && (a.innerHTML = l),
      setTimeout(ll.runtime, 1e3)
  },

  // 页脚友链
  addFriendLinksInFooter: function () {
    var fetchUrl = "https://friends.ll.sc.cn/randomfriend?num=3"
    fetch(fetchUrl)
      .then(res => res.json())
      .then(json => {
        var randomFriendLinks = ll.getArrayItems(json, 3);

        var htmlText = '';
        for (let i = 0; i < randomFriendLinks.length; ++i) {
          var item = randomFriendLinks[i]
          htmlText += `<a class='footer-menu-item' href='${item.link}'  target="_blank" rel="noopener nofollow">${item.name}</a>`;
        }
        htmlText += `<a class='footer-menu-item' href='/friends/'>更多…</a>`
        document.getElementById("friend-links-in-footer").innerHTML = htmlText;
      })
  },

  //从一个给定的数组arr中,随机返回num个不重复项
  getArrayItems: function (arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
      temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i < num; i++) {
      //判断如果数组还有可以取出的元素,以防下标越界
      if (temp_array.length > 0) {
        //在数组中产生一个随机索引
        var arrIndex = Math.floor(Math.random() * temp_array.length);
        //将此随机索引的对应的数组元素值复制出来
        return_array[i] = temp_array[arrIndex];
        //然后删掉此索引的数组元素,这时候temp_array变为新的数组
        temp_array.splice(arrIndex, 1);
      } else {
        //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
        break;
      }
    }
    return return_array;
  },

  //监听跳转页面输入框是否按下回车
  listenToPageInputPress: function () {
    var input = document.getElementById("toPageText");
    var button = document.getElementById("toPageButton");
    if (input) {
      input.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
          // 如果按下的是回车键，则执行特定的函数
          ll.toPage();
          var href = button.href;
          pjax.loadUrl(href);
        }
      });

      // 监听输入框变化
      input.addEventListener("input", function () {
        // 检查输入框是否为空
        if (input.value === "" || input.value === "0") {
          // 如果是空的，执行您的函数
          button.classList.remove("haveValue")
        } else {
          button.classList.add("haveValue")
        }

        var e = document.querySelectorAll(".page-number"),
          t = e[e.length - 1].innerHTML,
          n = Number(t),
          a = document.getElementById("toPageText"),
          o = Number(a.value);
        if (o > n) {
          input.value = n;
        };
      });
    }
  },

  // 分类目录条、标签目录条
  catalogActive: function () {
    let $list = document.getElementById('catalog-list')
    if ($list) {
      // 鼠标滚轮滚动
      $list.addEventListener('mousewheel', function (e) {
        // 计算鼠标滚轮滚动的距离
        $list.scrollLeft -= e.wheelDelta / 2
        // 阻止浏览器默认方法
        e.preventDefault()
      }, false)

      // 高亮当前页面对应的分类或标签
      let $catalog = document.getElementById(decodeURIComponent(window.location.pathname))
      $catalog.classList.add('selected')

      // 滚动当前页面对应的分类或标签到中部
      $list.scrollLeft = ($catalog.offsetLeft - $list.offsetLeft) - ($list.offsetWidth - $catalog.offsetWidth) / 2
    }
  },

  // 利用 SiteMap 随机访问站内页面
  randomPost: function () {
    fetch('/sitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
      let ls = data.querySelectorAll('url loc');
      let locationHref, locSplit;
      do {
        locationHref = ls[Math.floor(Math.random() * ls.length)].innerHTML
        locSplit = locationHref.split('/')[3] || ''
      } while (locSplit !== 'posts');
      location.href = locationHref
    })
  },

  // 白天夜晚切换动画
  switchNightMode: function () {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>'),
      setTimeout(function () {
        document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), localStorage.setItem('isDark', '0'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), localStorage.setItem('isDark', '1'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),
          setTimeout(function () {
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
            setTimeout(function () {
              document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
            }, 1e3);
          }, 2e3)
      })
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
      activateDarkMode()
      saveToLocal.set('theme', 'dark', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')
    } else {
      activateLightMode()
      saveToLocal.set('theme', 'light', 2)
      document.querySelector('body').classList.add('DarkMode'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
  },

  // 切换热评
  switchCommentBarrage: function () {
    let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
    document.getElementById('comment-barrage').style.display = flag === 'false' ? 'block' : 'none'
    // 本地缓存一天，刷新或切换页面时仍 隐藏或显示 热评。
    window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
  },

  // 评论表情包放大
  owoBig: function () {
    let flag = 1, // 设置节流阀
      owo_time = '', // 设置计时器
      m = 3; // 设置放大倍数
    // 创建盒子
    let div = document.createElement('div'),
      body = document.querySelector('body');
    // 设置ID
    div.id = 'owo-big';
    // 插入盒子
    body.appendChild(div)
    // 构造observer
    let observer = new MutationObserver(mutations => {
      for (let i = 0; i < mutations.length; i++) {
        let dom = mutations[i].addedNodes,
          owo_body = '';
        if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
        // 如果需要在评论内容中启用此功能请解除下面的注释
        // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
        else continue;
        // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
        if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
        // 鼠标移入
        owo_body.onmouseover = (e) => {
          if (flag && e.target.tagName == 'IMG') {
            flag = 0;
            // 移入300毫秒后显示盒子
            owo_time = setTimeout(() => {
              let height = e.path[0].clientHeight * m, // 盒子高
                width = e.path[0].clientWidth * m, // 盒子宽
                left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2, // 盒子与屏幕左边距离
                top = e.y - e.offsetY; // 盒子与屏幕顶部距离
              if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10); // 右边缘检测，防止超出屏幕
              if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
              // 设置盒子样式
              div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
              // 在盒子中插入图片
              div.innerHTML = `<img src="${e.target.src}">`
            }, 300);
          }
        };
        // 鼠标移出隐藏盒子
        owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
      }
    })
    observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true }) // 监听的 元素 和 配置项
  },

  // CSS 主颜色变量
  switchThemeColor: function ([r, g, b]) {
    document.documentElement.style.setProperty('--r', r)
    document.documentElement.style.setProperty('--g', g)
    document.documentElement.style.setProperty('--b', b)
    document.documentElement.style.setProperty('--second', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#000' : '#FFF')
    document.documentElement.style.setProperty('--cover-text', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#4C4948' : '#EEE')
  },
  // ColorThief 获取主颜色
  getMainColor: function (theme = '#ea517f') {
    let rgb = [parseInt('0x' + theme.slice(1, 3)), parseInt('0x' + theme.slice(3, 5)), parseInt('0x' + theme.slice(5, 7))]
    // if (document.getElementById('post-top-bg')) {
    //   try { rgb = new ColorThief().getColor(document.getElementById('post-top-bg')) } catch (err) { console.log(err) }
    // }
    return rgb
  },

  //引用到评论
  commentText: function (txt) {
    var input = document.getElementsByClassName('el-textarea__inner')[0];
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);
    let inputValue = replaceAll(txt, '\n', '\n> ')
    input.value = '> ' + inputValue + '\n\n';
    input.dispatchEvent(evt);
    var domTop = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, domTop - 80);
    input.focus();
    input.setSelectionRange(-1, -1);
    if (document.getElementById("comment-tips")) {
      document.getElementById("comment-tips").classList.add("show");
    }
    //替换所有内容
    function replaceAll(string, search, replace) {
      return string.split(search).join(replace);
    }
  },

  //友链随机传送
  travelling: function () {
    var fetchUrl = "https://friends.ll.sc.cn/randomfriend"
    fetch(fetchUrl)
      .then(res => res.json())
      .then(json => {
        var name = json.name;
        var link = json.link;
        var msg = "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」";
        document.styleSheets[0].addRule(':root', '--ll-snackbar-time:' + 8000 + 'ms!important');
        Snackbar.show({
          text: msg,
          duration: 8000,
          pos: 'snackbar-css top-center',
          actionText: '点击前往',
          onActionClick: function (element) {
            //Set opacity of element to 0 to close Snackbar
            $(element).css('opacity', 0);
            window.open(link, '_blank');
          }
        });
      })
  },

  // 快速申请友链
  linkCom: e => {
    var t = document.querySelector(".el-textarea__inner");
    "bf" == e ? (t.value = "```yml\n", t.value += "- name: \n  link: \n  avatar: \n  descr: \n  siteshot: ", t.value += "\n```", t.setSelectionRange(15, 15)) : (t.value = "站点名称：\n站点地址：\n头像链接：\n站点描述：\n站点截图：\nRSS地址：", t.setSelectionRange(5, 5)), t.focus()
  },

  // 首页bb
  initIndexEssay: function () {
    if (document.querySelector('#bber-talk')) {
      var swiper = new Swiper('.swiper-container', {
        direction: 'vertical', // 垂直切换选项
        loop: true,
        autoplay: {
          delay: 3000,
          pauseOnMouseEnter: true
        },
      });
    }
  },

  // Fps显示
  fpsShow: function () {
    // FPS显示begin
    let showFPS = (function () {
      // noinspection JSUnresolvedVariable, SpellCheckingInspection
      let requestAnimationFrame =
        window.requestAnimationFrame || //Chromium
        window.webkitRequestAnimationFrame || //Webkit
        window.mozRequestAnimationFrame || //Mozilla Geko
        window.oRequestAnimationFrame || //Opera Presto
        window.msRequestAnimationFrame || //IE Trident?
        function (callback) {
          //Fallback function
          window.setTimeout(callback, 1000 / 60);
        };

      let dialog;
      let container;

      let fps = 0;
      let lastTime = Date.now();

      function init() {
        dialog = document.createElement('dialog');
        container.appendChild(dialog);
        dialog.id = 'fps';
      }

      function calcFPS() {
        offset = Date.now() - lastTime;
        fps += 1;
        if (offset >= 1000) {
          lastTime += offset;
          displayFPS(fps);
          fps = 0;
        }

        requestAnimationFrame(calcFPS);
      }

      function displayFPS(fps) {
        let kd;
        if (fps <= 5) {
          kd = `<div style="color:#bd0000">卡成ppt🤢</div>`;
        } else if (fps <= 15) {
          kd = `<div style="color:red">电竞级帧率😖</div>`;
        } else if (fps <= 25) {
          kd = `<div style="color:orange">有点难受😨</div>`;
        } else if (fps < 35) {
          kd = `<div style="color:#9338e6">不太流畅🙄</div>`;
        } else if (fps <= 45) {
          kd = `<div style="color:#08b7e4">还不错哦😁</div>`;
        } else {
          kd = `<div style="color:#39c5bb">十分流畅🤣</div>`;
        }
        let fpsShow = `<span>FPS：${fps}</span>`;
        let fpsStr = `${fpsShow} ${kd}`;
        if (!dialog) {
          init();
        }

        if (fpsStr !== dialog.innerHTML) {
          dialog.innerHTML = fpsStr;
        }
      }

      return function (parent) {
        container = parent;
        calcFPS();
      };
    })();
    // FPS显示end
    showFPS(document.getElementById("nav-group"));
  },

  //关于页面 51LA访问统计
  aboutStatistic51La: function () {
    fetch('https://v6-widget.51.la/v6/Js0bWTKg5ezX8WPE/quote.js').then(res => res.text()).then((data) => {
      let title = ['最近活跃访客', '今日人数', '今日访问', '昨日人数', '昨日访问', '本月访问', '总访问量']
      let num = data.match(/(?<=<\/span><span>).*?(?=<\/span><\/p>)/g)
      let order = [1, 2, 3, 4, 5] // 新增  可排序，如果需要隐藏则删除对应数字即可。
      // 示例：[1, 3, 2, 4, 5] 显示 ['今日人数', '昨日人数', '今日访问', '昨日访问', '本月访问']，不显示 最近活跃访客(0) 和 总访问量(6)
      for (let i = 0; i < order.length; i++) { document.querySelectorAll('#statistic')[0].innerHTML += '<div><span>' + title[order[i]] + '</span><span>' + num[order[i]] + '</span></div>' }
    });
  },

  aboutForeverblogProgress: function () {
    var startTime = '2022-11-4'
    var endTime = '2032-11-4'
    var time1 = getDiffDay(startTime, endTime)
    var time2 = getDiffDay(startTime, new Date)
    var num = (Math.ceil(time2 / time1 * 100) / 1 + "%");
    var progressBar = document.querySelector('.progress-bar')
    progressBar.style.width = num // 控制css进度条的进度
    progressBar.innerHTML = num // 修改显示的进度值
    function getDiffDay(date_1, date_2) {
      // 计算两个日期之间的差值
      let totalDays, diffDate
      let myDate_1 = Date.parse(date_1)
      let myDate_2 = Date.parse(date_2)
      // 将两个日期都转换为毫秒格式，然后做差
      diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值
      totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整
      return totalDays    // 相差的天数
    }
  },

  // 旧浏览器弹窗提醒
  browserVersion: function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge浏览器
    var isFirefox = userAgent.indexOf("Firefox") > -1; //Firefox浏览器
    var isOpera = userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1; //Opera浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Edge") == -1 && userAgent.indexOf("OPR") == -1; //Chrome浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 && userAgent.indexOf("Edge") == -1 && userAgent.indexOf("OPR") == -1; //Safari浏览器
    if (isEdge) {
      if (userAgent.split('Edge/')[1].split('.')[0] < 90) {
        browserTC()
      }
    } else if (isFirefox) {
      if (userAgent.split('Firefox/')[1].split('.')[0] < 90) {
        browserTC()
      }
    } else if (isOpera) {
      if (userAgent.split('OPR/')[1].split('.')[0] < 80) {
        browserTC()
      }
    } else if (isChrome) {
      if (userAgent.split('Chrome/')[1].split('.')[0] < 90) {
        browserTC()
      }
    } else if (isSafari) {
      //不知道Safari哪个版本是该淘汰的老旧版本
    }

    function browserTC() {
      btf.snackbarShow("");
      Snackbar.show({
        text: '浏览器版本较低，网站样式可能错乱',
        actionText: '关闭',
        duration: '6000',
        pos: 'top-center'
      });
    }
    if (getCookie('browsertc') != 1) {
      setCookies({
        browsertc: 1,
      }, 1);
      ll.browserVersion();
    }
    function setCookies(obj, limitTime) {
      let data = new Date(new Date().getTime() + limitTime * 24 * 60 * 60 * 1000).toGMTString()
      for (let i in obj) {
        document.cookie = i + '=' + obj[i] + ';expires=' + data
      }
    }
    function getCookie(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return null;
    }
  },
}