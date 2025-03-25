alert("Welcome to Osiris's Site");
document.addEventListener("DOMContentLoaded", function() {
  const centeredText = document.getElementById("centeredText");

  if (centeredText) {
    centeredText.style.position = "fixed";
    centeredText.style.bottom = "0";
    centeredText.style.left = "0";
    centeredText.style.width = "100%";
    centeredText.style.textAlign = "center";
    centeredText.style.backgroundColor = "rgba(0,0,0,0.6)";
    centeredText.style.color = "white";
    centeredText.style.fontSize = "16px";
    centeredText.style.padding = "10px 0";
    centeredText.style.zIndex = "9999";
  }
});

