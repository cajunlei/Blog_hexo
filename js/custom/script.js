// 自定义js文件pjax适配begin
function whenDOMReady() {
  // 作者卡片问好
  if (document.getElementById('author-info_sayhi')) ll.cardInfoSayhi();
  // 主页哔哔
  if (document.getElementById('bbTimeList')) ll.initIndexEssay();
  // 返回顶部显示网页阅读进度
  window.addEventListener('scroll', ll.percent);
  // 分类目录条、标签目录条
  if (document.getElementById('catalog-list')) ll.catalogActive();
  // 页面标题
  window.addEventListener('scroll', ll.pageTitle);
  //网页运行时间
  ll.dynamicTitle();
  //页脚友链
  ll.addFriendLinksInFooter();
  // FPS显示
  showFPS(document.getElementById("nav-group"));
  //动态标题
  ll.runtime();
  // 评论表情放大
  if (document.getElementById('post-comment')) ll.owoBig();
  // 封面纯色
  if (document.getElementById('post')) ll.switchThemeColor(ll.getMainColor());
  // 监听跳转页面输入框是否按下回车
  ll.listenToPageInputPress();
}

(() => {
  const task = () => {
    // 这里写要执行的代码
    whenDOMReady() //打开网站之后先执行一次函数
    document.addEventListener("pjax:complete", whenDOMReady) //pjax加载完成之后执行上面函数
  }
  document.addEventListener('DOMContentLoaded', task)
  document.addEventListener('pjax:success', task)
})()
// 自定义js文件pjax适配end

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

  function setStyle(el, styles) {
    for (let key in styles) {
      el.style[key] = styles[key];
    }
  }

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

// 老旧浏览器弹窗提醒begin
function browserTC() {
  btf.snackbarShow("");
  Snackbar.show({
    text: '浏览器版本较低，网站样式可能错乱',
    actionText: '关闭',
    duration: '6000',
    pos: 'top-center'
  });
}
if (ll.getCookie('browsertc') != 1) {
  ll.setCookies({
    browsertc: 1,
  }, 1);
  ll.browserVersion();
}
// 老旧浏览器弹窗提醒end
