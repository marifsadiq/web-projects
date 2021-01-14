const form = document.getElementById('form'),
    searchTerm = document.getElementById('search-term'),
    random = document.getElementById('random'),
    resultHeading = document.getElementById('result-heading'),
    searchResults = document.getElementById('search-results'),
    recipe = document.getElementById('recipe')



function searchMeal(e){
    e.preventDefault()

    // clear single meal
    recipe.innerHTML = ''

    // get search term
    let term = searchTerm.value
    
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h3>Search results for '${term}':</h3>`

            if(data.meals === null){
                searchResults.innerHTML = ''
                resultHeading.innerText = `There are no results for '${term}'. Try again!`
            } else{
                searchResults.innerHTML = data.meals.map(meal => `
                    <a href="#top">
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h4>${meal.strMeal}</h4>
                            </div>
                        </div>
                    </a>
                `)
                .join('')
            }
        })
        // clear search text
        searchTerm.value = ''
    }else{
        alert('Please enter a search term')
    }
}

function getMealById(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            let meal = data.meals[0]

            addMealToDOM(meal)
        })
}
function getRandomMeal(){
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            let meal = data.meals[0]

            addMealToDOM(meal)
        })

    resultHeading.innerHTML = ''
    searchResults.innerHTML = ''
}

function addMealToDOM(meal){
    let ingredients = []

    for(let i = 1; i <= 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }else{
            break
        }
    }

    recipe.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <div class="image-container">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="recipe-info">
                <p>Category: ${meal.strCategory}</p>
                <p>Recipe Origin: ${meal.strArea}</p>
            </div>
        </div>
        <div class="instructions">
            <p>${meal.strInstructions}</p>
        </div>
        <h2>Ingredients</h2>
        <ul class="ingredients">
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
    `
}


form.addEventListener('submit', searchMeal)
random.addEventListener('click', getRandomMeal)
searchResults.addEventListener('click', (e) => {
    let mealID = e.target.getAttribute('data-mealid')
    getMealById(mealID);
})
    