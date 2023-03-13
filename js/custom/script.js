// 自定义js文件pjax适配start
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
