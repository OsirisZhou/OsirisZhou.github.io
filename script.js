document.addEventListener("DOMContentLoaded", function() {
  const animationContainer = document.getElementById('animation-container');
  const animation = lottie.loadAnimation({
    container: animationContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'osiris bento/05.json'
  });
  const audio = document.getElementById('myAudio');

  animation.addEventListener('data_ready', function() {
    animationContainer.style.display = 'none';
  });

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

  document.addEventListener('click', playAudio); // Listen for the first click
});
