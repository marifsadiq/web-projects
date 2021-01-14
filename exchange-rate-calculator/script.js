const currencyOne = document.getElementById('currency-one')
const currencyTwo = document.getElementById('currency-two')
const amountOne = document.getElementById('amount-one')
const amountTwo = document.getElementById('amount-two')
const rateElement = document.getElementById('rate')
const swap = document.getElementById('swap')

// Fetch exchange rates and update the DOM
function calculate(){
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne.value}`)
    .then(res => res.json())
    .then(data => {
      let rate = data.rates[currencyTwo.value]
      rateElement.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${currencyTwo.value}`
      amountTwo.value = (amountOne.value * rate).toFixed(3)
    })
}



// Event listeners
currencyOne.addEventListener('change', calculate)
currencyTwo.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
amountTwo.addEventListener('input', calculate)

swap.addEventListener('click', () => {
  let temp = currencyOne.value
  currencyOne.value = currencyTwo.value
  currencyTwo.value = temp

  calculate()
})

calculate()