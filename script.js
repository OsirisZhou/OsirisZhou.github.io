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
      path: 'osiris bento/05.json'
    });

    animation.addEventListener('DOMLoaded', function() {
      console.log("Lottie animation loaded successfully");
      animationContainer.style.display = 'none';
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

