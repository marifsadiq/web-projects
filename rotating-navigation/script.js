const openBtn = document.getElementById('open')
const closeBtn = document.getElementById('close')
const container = document.getElementById('container')
const circle = document.getElementById('circle')

openBtn.addEventListener('click', () => {
  container.classList.add('show-nav')
  document.body.style.overflowY = 'hidden'
  circle.style.transform = 'rotate(-90deg)'
})
closeBtn.addEventListener('click', () => {
  container.classList.remove('show-nav')
  document.body.style.overflowY = 'auto'
  circle.style.transform = 'rotate(0deg)'
})