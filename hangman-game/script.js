const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const notification = document.getElementById('notification')
const popup = document.getElementById('final-message-container')
const finalMessage = document.getElementById('final-message')
const playAgainBtn = document.getElementById('play-again')

const figureParts = document.querySelectorAll('.figure-part')

const words = ['application', 'programming', 'interface', 'wizard', 'simulator','morning', 'evening', 'pakistan', 'punjab', 'sindh'];

let selectedWord = words[Math.floor(Math.random() * words.length)]
console.log(selectedWord.split(''));
let correctLetters = []
let wrongLetters = []

/* ---------------------------Didplay Word----------------------- */
function displayWord(){
  wordEl.innerHTML = `${selectedWord.split('').map(letter =>
    `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}`

   

    const innerWord = wordEl.innerText.replace(/\n/g, '')
    console.log(innerWord, selectedWord);
    if(innerWord === selectedWord){
      finalMessage.innerText = 'Congratulations! You won! 😃'
      popup.style.display = 'flex'
    }
}
/* -----------------------------End---------------------------------- */

function updateWrongLettersEl(){
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
  // Display parts
  figureParts.forEach((part, index) => {
    if(index < wrongLetters.length){
      part.style.display = 'block'
    }else{
      part.style.display = 'none'
    }

  })

  // Check if lost
  if(wrongLetters.length === figureParts.length){
    finalMessage.innerText = 'Unfortunately you lost. 😕'
    popup.style.display = 'flex'
  }
}

// Show notification
function showNotification(){
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}


window.addEventListener('keydown', (e) => {
  if(e.keyCode >= 65 && e.keyCode <= 90){
    const letter = e.key

    if(selectedWord.includes(letter)){
      if(!correctLetters.includes(letter)){
        correctLetters.push(letter)
        displayWord()
      }else{
        showNotification()
      }
    }else{
      if(!wrongLetters.includes(letter)){
        wrongLetters.push(letter)
        updateWrongLettersEl()
      } else{
        showNotification()
      }
    }
  }
})

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  // empty arrays
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = words[Math.floor(Math.random() * words.length)]
  displayWord()
  updateWrongLettersEl()
  popup.style.display = 'none'
})


displayWord()