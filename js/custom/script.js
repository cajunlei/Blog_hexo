// 分类目录条、标签目录条end
// 切换热评start
function switchCommentBarrage() {
    let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
    document.getElementById('comment-barrage').style.display = flag === 'false' ? 'block' : 'none'
    // 本地缓存一天，刷新或切换页面时仍 隐藏或显示 热评。
    window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
}
// 切换热评end
// 分享本页start
function share() {
    let url = window.location.origin + window.location.pathname
    new ClipboardJS(".share", { text: function () { return '标题：' + document.title + '\n链接：' + url } });
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
    document.getElementById('page-title').style.display = window.location.pathname === '/' || /^\/page\/[0-9]+\//.test(window.location.pathname)
    document.querySelector('#page-title>span').innerHTML = GLOBAL_CONFIG_SITE.title
}
// 页面标题end

// 51la统计start
fetch('https://v6-widget.51.la/v6/Js0bWTKg5ezX8WPE/quote.js').then(res => res.text()).then((data) => {
    let title = ['最近活跃访客 :', '今日人数 :', '今日访问 :', '昨日人数 :', '昨日访问 :', '本月访问 :', '总访问量 :']
    let num = data.match(/(?<=<\/span><span>).*?(?=<\/span><\/p>)/g)
    let order = [1, 2, 3, 4, 5] // 新增  可排序，如果需要隐藏则删除对应数字即可。
    // 示例：[1, 3, 2, 4, 5] 显示 ['今日人数', '昨日人数', '今日访问', '昨日访问', '本月访问']，不显示 最近活跃访客(0) 和 总访问量(6)
    for (let i = 0; i < order.length; i++) { document.querySelectorAll('#statistic')[0].innerHTML += '<div class="webinfo-item"><div class="item-name">' + title[order[i]] + '</div><div class="item-count">' + num[order[i]] + '</div></div>' }
});
// 51la统计end

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
