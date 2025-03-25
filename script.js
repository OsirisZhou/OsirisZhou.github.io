document.addEventListener("DOMContentLoaded", function() {
  const centeredText = document.getElementById("centeredText");

import lottie from 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';

document.addEventListener("DOMContentLoaded", function() {
  const centeredText = document.getElementById("centeredText");

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


});

