let   mouseX,
      mouseY,
      trackX,
      trackY;

document.addEventListener("mousemove", function(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
  trackX = (4 * mouseX / 170) + 40;
  trackY = (4 * mouseY / 170) + 50;
  document.querySelector(".parallax").style.backgroundPosition = `${trackX}% ${trackY}%`
});