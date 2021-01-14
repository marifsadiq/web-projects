const container = document.getElementById('container')
const text = document.getElementById('text')

let totalTime = 7500
let breatheTime = totalTime * 0.4
let holdTime = totalTime * 0.2

breatheAnaimation()

function breatheAnaimation() {
  
    text.innerText = 'Breath In!'
    container.className = 'container grow'
  
  setTimeout(() => {
    text.innerText = 'Hold!'
  
    setTimeout(() => {
      text.innerText = 'Breath Out!'
      container.className = 'container shrink'
    }, holdTime)
  }, breatheTime)

}
setInterval(breatheAnaimation, totalTime)