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
  console.log(day);
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
//列表里面调用方法，传递两个参数 数据库时间和选择器
$(".one-comment").each(function () {
  var t_time = $(this).find(".time").text();
  var timeSelector = $(this).find(".time");
  setTime(t_time, timeSelector);
})