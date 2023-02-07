// 分享本页
function share() {
  let url = window.location.origin + window.location.pathname
  new ClipboardJS(".share", {
    text: function () {
      return '标题：' + document.title + '\n链接：' + url
    }
  });
  btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~", false, 3000)
}

// 监听copy事件
document.addEventListener("copy", function (e) {
  btf.snackbarShow('已复制到剪切板，请遵循GPL协议', false, 3000)
})

// 检测按键
window.onkeydown = function (e) {
  if (e.keyCode === 123) {
    btf.snackbarShow('开发者模式已打开，请遵循GPL协议', false, 3000)
  }
}