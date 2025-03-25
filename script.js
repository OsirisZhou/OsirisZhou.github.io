document.addEventListener("DOMContentLoaded", function() {
 Container = document.getElementById('animation-container');
  const audio = document.getElementById('myAudio');
  let animation; // Declare animation variable

  function loadAnimation() {
  const animation = lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg', // 渲染方式 (svg, canvas, html)
    loop: true, // 是否循环播放
    autoplay: true, // 是否自动播放
    path: 'osiris bento/05.json' // Lottie JSON 文件的路径 (替换为你的文件路径)
  });

    setTimeout(function() {
    document.getElementById('animation-container').style.display = 'none'; // 隐藏 animation-container
  }, 2000);
});


    animation.addEventListener('DOMLoaded', function() {
      console.log("Lottie animation loaded successfully - DOMLoaded event triggered!");
      animationContainer.style.display = 'none';
 }
     
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

  // 预加载音频文件
  audio.preload = 'auto';

  // Try to load animation immediately
  loadAnimation();

  // Listen for the first click to play audio
  document.addEventListener('click', playAudio);
});
