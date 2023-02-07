// 自定义js文件pjax适配start
function whenDOMReady() {
  // 作者卡片问好
  ll.cardInfoSayhi();
  // 返回顶部显示网页阅读进度
  window.addEventListener('scroll', ll.percent);
  // 分类目录条、标签目录条
  ll.catalogActive();
  // 页面标题
  window.addEventListener('scroll', ll.pageTitle);
  //网页运行时间
  ll.dynamicTitle();
  //页脚友链
  ll.addFriendLinksInFooter();
  //动态标题
  ll.runtime();
  // 如果当前页有评论就执行函数
  if (document.getElementById('post-comment')) ll.owoBig();
  // 封面纯色
  if (document.getElementById('post')) ll.switchThemeColor(ll.getMainColor());
}

whenDOMReady() //打开网站之后先执行一次函数
document.addEventListener("pjax:complete", whenDOMReady) //pjax加载完成之后执行上面函数
// 自定义js文件pjax适配end

// 老旧浏览器弹窗提醒start
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
