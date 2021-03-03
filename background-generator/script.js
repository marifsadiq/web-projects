const color1 = document.getElementById('color-1');
const color2 = document.getElementById('color-2');
const currentBgColor = document.getElementById('current-bg-color');
const body = document.getElementById('body-bg');

//currentBgColor.textContent = 'linear-gradient(to right, rgb(0, 255, 0), rgb(255, 0, 0))';

function setGradientBg() {
  body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
  currentBgColor.textContent = body.style.background;
}

color1.addEventListener('input', setGradientBg);
color2.addEventListener('input', setGradientBg);
