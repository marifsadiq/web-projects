const settingsBar = document.getElementById('settings-bar')
const form = document.getElementById('form')
const difficultySelect = document.getElementById('difficulty-level')
const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreCard = document.getElementById('score')
const timestamp = document.getElementById('time')
const endGame = document.getElementById('end-game')
const settingsBtn = document.getElementById('settings-btn')

let randomWord = '';

let words = [
  "OK",
  "a",
  "aah",
  "aalii",
  "aardvark",
  "aardvarks",
  "aardwolf",
  "aardwolves",
  "aba",
  "abaca",
  "abandoning",
  "abandonment",
  "ablutions",
  "ably",
  "abmho",
  "abnegate",
  "academy",
  "acaleph",
  "acanthaceous",
  "acanthocephalan",
  "admeasuring",
  "admen",
  "adminicle",
  "administer",
  "bulldozing",
  "bulled",
  "bullet",
  "bulletin",
  "bulrushes",
  "bulwark",
  "bulwarks",
  "bum",
  "burled",
  "burlesque",
  "byzantine",
  "cables",
  "cablet",
  "cablevision",
  "cableway",
  "cabling",
  "cabman",
  "calciferous",
  "calcific",
  "calcification",
  "calcified",
  "hefty",
  "hegemonic",
  "hegemonism",
  "heliocentricity",
  "heliograph",
  "heliotaxis",
  "heliotherapy",
  "hellbent",
  "hellbox",
  "hellcat",
  "mortuary",
  "morula",
  "mosaic",
  "tables",
  "tablespoon",
  "tablets",
  "tableware",
  "tabling",
  "tabloid",
  "tachometry",
  "tachycardia",
  "tachygraphy",
  "taken",
  "takeoff",
  "transoceanic",
  "transom",
  "transomed",
  "transoms",
  "transonic",
  "transpacific",
  "transpadane",
  "transparencies",
  "transparency",
  "transparent",
  "transparently",
  "sandwiching",
  "sandy",
  "sane",
  "sanguinity",
  "sanguinolent",
  "sanies",
  "sanious",
  "nowhere",
  "nowhither",
  "nowise",
  "nowt",
  "noxious",
  "noxiously",
  "zoster",
  "zucchetto",
  "zucchini",
  "zygomas",
  "zygophyllaceous",
  "zygophyte",
  "zygoses",
  "zymotic",
  "zymurgy",
]

let time = 10
let score = 0

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy'

difficultySelect.value = difficulty

text.focus()

let timeInterval = setInterval(updateTime, 1000)

function getRandomWord(){
  return words[Math.floor(Math.random() * words.length)]
}
function addWordToDOM(){
  
    randomWord = getRandomWord()
    console.log(randomWord);
    word.innerHTML = randomWord
  
}
function updateScore(){
  score++
  scoreCard.innerHTML = score
}
function updateTime(){
  time--
  timestamp.innerHTML = time + 's'

  if(time === 0){
    clearInterval(timeInterval)

    gameOver()
  }
}
function gameOver(){
  endGame.innerHTML = `
  <div class="inner">
  <h1>Game Over</h1>
  <h2>Your score is ${score}.</h2>
  <p style="margin: 1em 0">Reload to play again!</p>
  <button onclick="location.reload()">Reload</button>
</div>
  `
  endGame.style.display = 'flex'
}

addWordToDOM()




text.addEventListener('input', e => {
  let insertedText = e.target.value

  if(insertedText === randomWord){
    addWordToDOM()
    updateScore()

    e.target.value = ''

    if(difficulty === 'hard'){
      time += 2
    } else if (difficulty === 'medium'){
      time += 3
    } else{
      time += 5
    }

    updateTime()
  }
})

settingsBtn.addEventListener('click', () =>{
  settingsBar.classList.toggle('hide')
})

form.addEventListener('change', (e) => {
  difficulty = e.target.value
  localStorage.setItem('difficulty',difficulty)
})