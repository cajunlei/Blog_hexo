var countdown = () => {
  if (!document.querySelector('#countdown')) return;
  // 新年时间戳 and 星期对象
  let countdown = new Date('2023-09-09 00:00:00').getTime() / 1000,
    week = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' }
  time();
  // 补零函数
  function nol(h) { return h > 9 ? h : '0' + h; };
  function time() {
    // 现在 时间对象
    let now = new Date();
    // 右下角 今天
    document.querySelector('#countdown .today').innerHTML = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + week[now.getDay()]
    // 现在与新年相差秒数
    let second = countdown - Math.round(now.getTime() / 1000);
    // 小于0则表示已经过年
    if (second < 0) {
      document.querySelector('#countdown .title').innerHTML = '做的全会，懵的全对。';
      document.querySelector('#countdown .countdown-time').innerHTML = '<span class="passTheExam">逢考必过</p>';
    } else {
      // 大于0则还未过年
      document.querySelector('#countdown .title').innerHTML = '距离2023年一建考试：'
      // 大于一天则直接渲染天数
      if (second > 86400) {
        document.querySelector('#countdown .countdown-time').innerHTML = `<span class="day">${Math.ceil(second / 86400)}<span class="unit">天</span></span>`
      } else {
        // 小于一天则使用时分秒计时。
        let h = nol(parseInt(second / 3600));
        second %= 3600;
        let m = nol(parseInt(second / 60));
        second %= 60;
        let s = nol(second);
        document.querySelector('#countdown .countdown-time').innerHTML = `<span class="time">${h}:${m}:${s}</span></span>`;
        // 计时
        countdownTimer = setTimeout(time, 1000);
      }
    }
  }
}
countdown();