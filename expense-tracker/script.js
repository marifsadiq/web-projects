const balance = document.getElementById('balance')
const incomeEl = document.getElementById('income')
const expenseEl = document.getElementById('expense')
const history = document.getElementById('history')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

function addTransaction(e) {
  e.preventDefault()
 

  if(text.value.trim() === '' && amount.value.trim() === ''){
    alert('Please enter text and amount')
  }else{
   let transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value
    }

    transactions.push(transaction)

    addTransactionDOM(transaction)
    updateValues()
    updateLocalStorage()
  
    text.value = ''
    amount.value = ''
  }
  // console.log(transaction);
 

}
function generateId(){
  return Math.floor(Math.random() * 100000)
}

function addTransactionDOM(transaction){
  let sign = transaction.amount > 0 ? '+' : '-'

  let item = document.createElement('li')
  item.classList.add(transaction.amount > 0 ? 'income' : 'expense')
  item.innerHTML = `
    <span>${transaction.text}</span><span>${sign}${Math.abs(transaction.amount)}</span><span class="delete-btn" onclick="removeTransaction(${transaction.id})">X</span>
  `;
  history.appendChild(item)
}

function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id)
  updateLocalStorage()
  init()
}
function updateLocalStorage(){
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

function updateValues(){
  const amounts = transactions.map(transaction => transaction.amount)
  
  let total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
  
  let income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  let expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2)

  balance.innerText = `$${total}`
  incomeEl.innerText = `$${income}`
  expenseEl.innerText = `$${expense}`

}

function init(){
  history.innerHTML = ''

  transactions.forEach(addTransactionDOM)
  updateValues()
}
init()

form.addEventListener('submit', addTransaction)