const selectContainer = document.getElementById('select-container')
const closeBtn = document.getElementById('close')
const showSelectContainer = document.getElementById('show-select-container')
const selectVoice = document.getElementById('select-voice')
const textArea = document.getElementById('text')
const speakBtn = document.getElementById('speak-btn')
const main = document.querySelector('main')

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

const message = new SpeechSynthesisUtterance()
let voices = []

data.forEach(item => {
  const box = document.createElement('div')
  box.className = 'box'
  box.innerHTML = `
    <img src="${item.image}" alt="${item.text}"/>
    <h3>${item.text}</h3>
  `

  box.addEventListener('click', () => {
    setTextMessage(item.text)
    speakText()

    box.classList.add('active')
    setTimeout(() => {box.classList.remove('active')}, 300)
    
  })

  main.appendChild(box)
})

function populateSelectList(){
  voices = speechSynthesis.getVoices()
  voices.forEach(voice => {
    const option = document.createElement('option')
    option.value = voice.name
    option.innerText = `${voice.name} (${voice.lang})`

    selectVoice.appendChild(option)
  })
}
// Set text
function setTextMessage(text){
  message.text = text
}

// Speak text
function speakText(){
  speechSynthesis.speak(message)
}
// Set voice
function setVoice(e){
  message.voice = voices.find(voice => voice.name === e.target.value)
}




// Event liteners

speechSynthesis.addEventListener('voiceschanged', populateSelectList)


speakBtn.addEventListener('click', () => {
  setTextMessage(textArea.value)
  speakText()
})

showSelectContainer.addEventListener('click', () => {
  selectContainer.classList.toggle('show')
})
closeBtn.addEventListener('click', () => {
  selectContainer.classList.remove('show')
})
selectVoice.addEventListener('change', setVoice)

populateSelectList();