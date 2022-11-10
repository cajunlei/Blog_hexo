// 分享本页start
function share() {
    let url = window.location.origin + window.location.pathname
    new ClipboardJS(".share", { text: function() { return '标题：' + document.title + '\n链接：' + url } });
    btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~")
}
// 分享本页end

// 返回顶部显示网页阅读进度 start
window.onscroll = percent;// 执行函数
function percent() {
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
}
// 返回顶部显示网页阅读进度 end

// 白天夜晚切换动画start
function switchNightMode() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>'),
        setTimeout(function() {
        document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), localStorage.setItem('isDark', '0'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), localStorage.setItem('isDark', '1'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),
            setTimeout(function() {
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
            setTimeout(function() {
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
    document.getElementById('page-title').style.display = window.location.pathname === '/' || /^\/page\/[0-9]+\//.test(window.location.pathname)
    document.querySelector('#page-title>span').innerHTML = GLOBAL_CONFIG_SITE.title
}
// 页面标题end

// 51la统计啊start
fetch('https://v6-widget.51.la/v6/Js0bWTKg5ezX8WPE/quote.js').then(res => res.text()).then((data) => {
    let title = ['最近活跃访客 :', '今日人数 :', '今日访问 :', '昨日人数 :', '昨日访问 :', '本月访问 :', '总访问量 :']
    let num = data.match(/(?<=<\/span><span>).*?(?=<\/span><\/p>)/g)
    let order = [1, 2, 3, 4, 5] // 新增  可排序，如果需要隐藏则删除对应数字即可。
    // 示例：[1, 3, 2, 4, 5] 显示 ['今日人数', '昨日人数', '今日访问', '昨日访问', '本月访问']，不显示 最近活跃访客(0) 和 总访问量(6)
    for (let i = 0; i < order.length; i++) { document.querySelectorAll('#statistic')[0].innerHTML += '<div class="webinfo-item"><div class="item-name">' + title[order[i]] + '</div><div class="item-count">' + num[order[i]] + '</div></div>' }
});
// 51la统计啊end