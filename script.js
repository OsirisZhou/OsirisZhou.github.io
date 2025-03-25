document.addEventListener("DOMContentLoaded", function() {
  const animationContainer = document.getElementById('animation-container');
  const animation = lottie.loadAnimation({
    container: animationContainer, // 动画容器
    renderer: 'svg', // 渲染方式 (svg, canvas, html)
    loop: true, // 是否循环播放
    autoplay: true, // 是否自动播放
    path: 'osiris bento/05.json' // Lottie JSON 文件的路径 (替换为你的文件路径)
  });
  const audio = document.getElementById('myAudio');
  
// 监听 Lottie 动画加载完成事件 (推荐)
  animation.addEventListener('data_ready', function() {
    animationContainer.style.display = 'none';
    audio.play();
  });
});

