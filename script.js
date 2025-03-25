document.addEventListener("DOMContentLoaded", function() {
  const animationContainer = document.getElementById('animation-container');
  const audio = document.getElementById('myAudio');
  let animation; // Declare animation variable

  function loadAnimation() {
    animation = lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'osiris bento/05.json', // 确保路径正确
      // 添加以下配置项，提高兼容性
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet', // 保持宽高比
        progressiveLoad: false, // 关闭渐进式加载
        hideOnTransparent: false // 透明时也显示
      }
    });

    animation.addEventListener('DOMLoaded', function() {
      console.log("Lottie animation loaded successfully - DOMLoaded event triggered!");
      animationContainer.style.display = 'none';

      // 降低动画播放速度，延长播放时间
      animation.setSpeed(0.5); // 设置播放速度为 0.5 倍

      animation.play(); // 播放动画
    });

    animation.addEventListener('complete', function() {
      console.log("Lottie animation completed");
    });

    animation.addEventListener('dataFailed', function(error) {
      console.error("Lottie animation data failed to load:", error);
    });
  }

  function playAudio() {
    audio.play()
      .then(() => {
        console.log("Audio played successfully");
      })
      .catch(error => {
        console.error("Audio playback failed:", error);
      });
    document.removeEventListener('click', playAudio); // Remove the listener after the first click
  }

  // Try to load animation immediately
  loadAnimation();

  // Listen for the first click to play audio
  document.addEventListener('click', playAudio);
});


