// 自定义js文件pjax适配start
function whenDOMReady() {
  //列表里面调用方法，传递两个参数 数据库时间和选择器
  $(".one-comment").each(function () {
    var t_time = $(this).find(".time").text();
    var timeSelector = $(this).find(".time");
    setTime(t_time, timeSelector);
  })
  // 加载更多
  llMoments.momentsInit();
}

function setTime(time, timeSelector) {
  var currentTime = Date.parse(new Date());
  var dateTime = time;//后台传递来的时间
  var ts = timeSelector;//选择器
  var d_day = Date.parse(new Date(dateTime));
  var year = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24 / 30 / 12));//计算年份
  var month = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24 / 30));//计算月份
  var day = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24));//计算日期
  var hour = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600));//计算小时
  var minutes = Math.abs(parseInt((d_day - currentTime) / 1000 / 60));//计算分钟
  var seconds = Math.abs(parseInt((d_day - currentTime) / 1000));//计算秒
  if (day >= 365) {
    ts.text(parseInt(year) + "年" + (month - year * 12) + "个月" + (day - (year * 12 * 30 + year * 5)) + "天前").toString();
  } else if (day >= 31) {
    ts.text(parseInt(month) + "个月" + (day - month * 30) + "天前").toString();
  } else if (day >= 2) {
    ts.text(parseInt(day) + "天前").toString();
  } else if (day > 0 && day < 2) {
    ts.text("昨天").toString();
  } else if (hour > 0 && hour < 24) {
    ts.text(parseInt(hour) + "小时前").toString();
  } else if (minutes > 0 && minutes < 60) {
    ts.text(parseInt(minutes) + "分钟前").toString();
  } else if (seconds > 0 && seconds < 60) {
    ts.text(parseInt(seconds) + "秒前").toString();
  }
}

var moments_content = []; //临时存储内容
var llMoments = {
  moments_default: 20, //默认显示个数
  moments_loading: 10,  //每次点击按钮后加载的个数
  momentsInit: function () {
    var lis = $("#moments .moments_hidden .one-comment");
    $("#moments .moments_items").html("");
    for (var n = 0; n < llMoments.moments_default; n++) {
      lis.eq(n).appendTo("#moments .moments_items");
    }
    $("#moments .moments_items").each(function () {
      $(this).attr('src', $(this).attr('realSrc'));
    })
    for (var i = llMoments.moments_default; i < lis.length; i++) {
      moments_content.push(lis.eq(i));
    }
    $("#moments .moments_hidden").html("");
  },
  momentsLoadmore: function () {
    var mLis = $("#moments .moments_items .one-comment").length;
    for (var i = 0; i < llMoments.moments_loading; i++) {
      var target = moments_content.shift();
      if (!target) {
        $('#moments .moments_more').html("<p>没有了~真的没有了~~</p>");
        break;
      }
      $("#moments .moments_items").append(target);
      $("#moments .moments_items").eq(mLis + i).each(function () {
        $(this).attr('src', $(this).attr('realSrc'));
      });
    }
  }
}

whenDOMReady() //打开网站之后先执行一次函数
document.addEventListener("pjax:complete", whenDOMReady) //pjax加载完成之后执行上面函数