// 调用霞鹜文楷在线字体start
// function lxgw_wenkai_screen() {
//   const link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.type = "text/css";
//   link.href = "https://npm.elemecdn.com/lxgw-wenkai-screen-webfont/style.css";
//   document.head.append(link);
// }
// lxgw_wenkai_screen();
// 调用霞鹜文楷在线字体end

// 作者卡片问好start
// function authorInfoSayhi() {
//   // 获取时间
//   var getTimeState = () => {
//     // 获取当前时间
//     var timeNow = new Date();
//     // 获取当前小时
//     var hours = timeNow.getHours();
//     // 设置默认文字
//     var text = ``;
//     // 判断当前时间段
//     if (hours >= 0 && hours <= 5) {
//       text = `晚安`;
//     } else if (hours > 5 && hours <= 10) {
//       text = `早上好`;
//     } else if (hours > 10 && hours <= 14) {
//       text = `中午好`;
//     } else if (hours > 14 && hours <= 18) {
//       text = `下午好`;
//     } else if (hours > 18 && hours <= 24) {
//       text = `晚上好`;
//     }
//     return text;
//   };
//   if (document.querySelector('#author-info__sayhi')) {
//     document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是";
//   }
// };
// authorInfoSayhi();
function card_info() {
  fetch("https://api.vvhan.com/api/visitor.info").then((n => n.json())).then((n => {
    let t = n.time.substring(11, 13), o = -1 !== n.location.indexOf("-") ? n.location.split("-") : n.location.split(" "), i = o[o.length - 1];
    document.getElementById("author-info__sayhi").innerHTML = `<strong>${t < 5 ? "深夜了！🥱" : t < 11 ? "早上好！👋" : t < 14 ? "中午好！😄" : t < 19 ? "下午好！☕" : "晚上好！😄"} </strong><br>欢迎来自 <strong>${i}</strong> 的小伙伴。`
  })).catch((function (n) { console.log(n) }))
}
card_info();
// 作者卡片问好end

// 切换热评start
function switchCommentBarrage() {
  let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
  document.getElementById('comment-barrage').style.display = flag === 'false' ? 'block' : 'none'
  // 本地缓存一天，刷新或切换页面时仍 隐藏或显示 热评。
  window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
}
// 切换热评end

// 白天夜晚切换动画start
function switchNightMode() {
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
}
// 白天夜晚切换动画end

//动态标题start
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
});
//动态标题end

// 页面标题start
window.onscroll = page_title;
function page_title() {
  document.getElementById('page-name-text').style.display = window.location.pathname === '/' || /^\/page\/[0-9]+\//.test(window.location.pathname)
  document.querySelector('#page-name-text').innerHTML = GLOBAL_CONFIG_SITE.title
}
// 页面标题end
// 利用 SiteMap 随机访问站内页面start
function randomPost() {
  fetch('/sitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
    let ls = data.querySelectorAll('url loc');
    let locationHref, locSplit;
    do {
      locationHref = ls[Math.floor(Math.random() * ls.length)].innerHTML
      locSplit = locationHref.split('/')[3] || ''
    } while (locSplit !== 'posts');
    location.href = locationHref
  })
}
// 利用 SiteMap 随机访问站内页面end
// 老旧浏览器弹窗提醒start
function browserTC() {
  btf.snackbarShow("");
  Snackbar.show({
    text: '浏览器版本较低，网站样式可能错乱',
    actionText: '关闭',
    duration: '6000',
    pos: 'bottom-right'
  });
}
function browserVersion() {
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
}
//2022-10-29修正了一个错误：过期时间应使用toGMTString()，而不是toUTCString()，否则实际过期时间在中国差了8小时
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
if (getCookie('browsertc') != 1) {
  setCookies({
    browsertc: 1,
  }, 1);
  browserVersion();
}
// 老旧浏览器弹窗提醒end

// 封面纯色start
var ll = {
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
    if (document.getElementById('post-top-bg')) {
      try { rgb = new ColorThief().getColor(document.getElementById('post-top-bg')) } catch (err) { console.log(err) }
    }
    return rgb
  }
};
ll.switchThemeColor(ll.getMainColor());
// 封面纯色end