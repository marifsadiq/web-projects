// const card = document.getElementById('card')
const cardsContainer = document.getElementById('cards-container')
const cards = document.querySelectorAll('.card')
const showAddContainerBtn = document.getElementById('show-add-btn')
const showAddCardWrapper = document.getElementById('add-card-wrapper')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')
const closeBtn = document.getElementById('close-btn')
const leftNavBtn = document.getElementById('left-nav-btn')
const rightNavBtn = document.getElementById('right-nav-btn')
const currentCardText = document.getElementById('current-card')
const clearCardsBtn = document.getElementById('clear-cards')

// Keep track of current card
let currentActiveCard = 0

// Store All cards to DOM
const allCardsDOM = []

// Store card data
const cardsData = getCardsData()



  function createAllCards(){
    cardsData.forEach((data, index) => createSingleCard(data, index))
  }
  function createSingleCard(data, index){
    const card = document.createElement('div')
    card.classList.add('card')

    if(index === 0){
      card.classList.add('active')
    }
    card.innerHTML = `
    <div class="card__front"><h3>${data.question}</h3></h3></div>
    <div class="card__back"><p>${data.answer}</p></div>
    `
    card.addEventListener('click', () => {
      card.classList.toggle('flip')
    })

    // Add to DOM cards
    allCardsDOM.push(card)
    cardsContainer.appendChild(card)
    updateCurrentCardText()
  }

  function updateCurrentCardText(){
    currentCardText.innerText = `${currentActiveCard + 1} / ${allCardsDOM.length}`
  }
  function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
  }

  function setCardsData(cards){
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload()
  }
  

createAllCards()


if(allCardsDOM.length){
  rightNavBtn.addEventListener('click', () => {
    allCardsDOM[currentActiveCard].className = 'card left'

    currentActiveCard = currentActiveCard + 1

    if(currentActiveCard > allCardsDOM.length - 1){
      currentActiveCard = allCardsDOM.length - 1
    }
    
    allCardsDOM[currentActiveCard].className = 'card active'
    updateCurrentCardText()
  })

  leftNavBtn.addEventListener('click', () => {
    allCardsDOM[currentActiveCard].className = 'card'

    currentActiveCard = currentActiveCard - 1

    if(currentActiveCard < 0){
      currentActiveCard = 0
    }

    allCardsDOM[currentActiveCard].className = 'card active'
    updateCurrentCardText()
  })
} else{
  rightNavBtn.disabled = true
  leftNavBtn.disabled = true
  cardsContainer.innerHTML = '<h3 style="text-align: center;">There is no card. Add Memory Cards.</h3>'
}

showAddContainerBtn.addEventListener('click', () => {
  showAddCardWrapper.classList.add('show')
})

closeBtn.addEventListener('click', () => {
  showAddCardWrapper.classList.remove('show')
})

addCardBtn.addEventListener('click', () => {
  const question = questionEl.value
  const answer = answerEl.value

  if(question.trim() && answer.trim()){
    const newCard = { question, answer }
    createSingleCard(newCard)

    questionEl.value = ''
    answerEl.value = ''

    showAddCardWrapper.classList.remove('show')

    cardsData.push(newCard)
    setCardsData(cardsData)
  }
})
clearCardsBtn.addEventListener('click', () => {
  localStorage.clear()
  cardsContainer.innerHTML = ''
  window.location.reload()
})




