document.addEventListener("DOMContentLoaded", function() {
  const animationContainer = document.getElementById('animation-container');
  const audio = document.getElementById('myAudio');
  let animation;

  function loadAnimation() {
    animation = lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'osiris bento/05.json'
    });

    animation.addEventListener('dataReady', function() {
      console.log("Lottie animation loaded successfully - dataReady event triggered!");
      // 确保动画加载完成后再设置 setTimeout
      setTimeout(function() {
        animationContainer.style.display = 'none';
      }, 5000); // 延长到 5 秒
    });

    animation.addEventListener('complete', function() {
      console.log("Lottie animation completed");
    });

    animation.addEventListener('dataFailed', function(error) {
      console.error("Lottie animation data failed to load:", error);
    });
  }

  function playAudio() {
    // 确保音频文件已加载
    audio.addEventListener('loadeddata', function() {
      console.log("Audio loaded successfully");
      // 延迟音频播放
      setTimeout(function() {
        audio.play()
          .then(() => {
            console.log("Audio played successfully");
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
          });
      }, 1000); // 延迟 1 秒
    });

    // 触发音频加载
    audio.preload = 'auto';
    audio.load();
    document.removeEventListener('click', playAudio);
  }

  loadAnimation();
  document.addEventListener('click', playAudio);
});
