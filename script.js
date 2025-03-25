alert("Welcome to Osiris's Site");
document.addEventListener("DOMContentLoaded", function() {
  const centeredText = document.getElementById("centeredText");

import lottie from 'lottie-web';
// 加载 Lottie 动画
const animation = lottie.loadAnimation({
    container: document.getElementById('loading'), // 动画容器
    renderer: 'svg', // 渲染方式 (svg, canvas, html)
    loop: true, // 是否循环播放
    autoplay: true, // 是否自动播放
    path: 'osiris bento/05.json' // Lottie JSON 文件的路径 (替换为你的文件路径)
});

// 模拟加载完成 (实际应用中，替换为你的加载逻辑)
setTimeout(function() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}, 2000);


  if (centeredText) {
    centeredText.style.position = "fixed";
    centeredText.style.bottom = "0";
    centeredText.style.left = "0";
    centeredText.style.width = "100%";
    centeredText.style.textAlign = "center";
    centeredText.style.backgroundColor = "rgba(0,0,0,0.4)";
    centeredText.style.color = "white";
    centeredText.style.fontSize = "16px";
    centeredText.style.padding = "10px 0";
    centeredText.style.zIndex = "9999";
  }
});

