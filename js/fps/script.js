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

showFPS(document.getElementById("nav-group"));
