var ll = {
  // 调用霞鹜文楷在线字体
  lxgwWenkaiScreen: function () {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://npm.elemecdn.com/lxgw-wenkai-screen-webfont/style.css";
    document.head.append(link);
  },

  // 作者卡片问好heo
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
    if (document.querySelector('#author-info__sayhi')) {
      document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是";
    }
  },

  // 作者卡片问好
  cardInfoSayhi: function () {
    fetch("https://api.vvhan.com/api/visitor.info").then((n => n.json())).then((n => {
      let t = n.time.substring(11, 13), o = -1 !== n.location.indexOf("-") ? n.location.split("-") : n.location.split(" "), i = o[o.length - 1];
      document.getElementById("author-info__sayhi").innerHTML = `<strong>${t < 5 ? "深夜了！🥱" : t < 11 ? "早上好！👋" : t < 14 ? "中午好！😄" : t < 19 ? "下午好！☕" : "晚上好！😄"} </strong><br>欢迎来自 <strong>${i}</strong> 的小伙伴。`
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
  },

  // 快速申请友链
  linkCom: e => {
    var t = document.querySelector(".el-textarea__inner");
    "bf" == e ? (t.value = "```yml\n", t.value += "- name: \n  link: \n  avatar: \n  descr: ", t.value += "\n```", t.setSelectionRange(15, 15)) : (t.value = "站点名称：\n站点地址：\n头像链接：\n站点描述：\nRSS地址：", t.setSelectionRange(5, 5)), t.focus()
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
  },
  setCookies: function (obj, limitTime) {
    let data = new Date(new Date().getTime() + limitTime * 24 * 60 * 60 * 1000).toGMTString()
    for (let i in obj) {
      document.cookie = i + '=' + obj[i] + ';expires=' + data
    }
  },
  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
}
//替换所有内容
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}