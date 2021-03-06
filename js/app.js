window.onload = function() {
    document.getElementById('spinner').style.display = 'none';
};

// display all types of meals
const displayMeals = meals => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.textContent = '';

    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';

    meals.forEach(meal => {
        
        const div = document.createElement('div');
        div.classList.add('col-sm-3');
        
        div.innerHTML = `
            <div class="card mb-3">
                <img src="${meal.strMealThumb}" alt="">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <button type="button" class="btn btn-primary" onclick = "loadMealDetails(${meal.idMeal})">see details</button>
                </div>  
            </div>
        `
        mealContainer.appendChild(div);
    })

}

// meal details
const displayMealDetails = meal => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.textContent = '';

    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';

    meal.forEach(meal => {
        
        const div = document.createElement('div');
        const ingredientList = ingredientUl(meal);
        div.innerHTML = `
            <img width="100%" height="400" src="${meal.strMealThumb}" alt="">
            <h3 class="my-3">${meal.strMeal}<span>(${meal.strArea})</span></h3>
            <p>${meal.strInstructions}</p>
            <h5>Meal Ingredients</h5>
        `
        mealDetails.appendChild(div);
        mealDetails.appendChild(ingredientList);
    })
}

/**
 * 
 * load initial all types of meals
 * 
 */
const loadAllTypesMeals = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(res => res.json())
        .then(json => displayMeals(json.meals))
}
loadAllTypesMeals();

/**
 * 
 * search by name
 * 
 */
 const loadSearchByName = async() => {
    const searchText = document.getElementById('search-text').value;
    if(searchText){
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
        const jsonData = await data.json();

        if(jsonData.meals){
            displayMeals(jsonData.meals);
        }
        else alert('This meal is not found.')
        
    }
    

}

/**
 * 
 * load meal details
 * 
 */

const loadMealDetails = async (id) => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const jsonData = await data.json();

    displayMealDetails(jsonData.meals);
}


// ingredient lists
const ingredientUl = meal => {
    let ul = document.createElement('ul');
    for(let i=1;i<=20;i++){
        const mealIngredient = document.createElement('li');
        const ingredient = `strIngredient${i}`;
        const measure = `strMeasure${i}`
        
        if(!meal[ingredient]) break;
        mealIngredient.innerText = `${meal[ingredient]} (${meal[measure]})`
        ul.appendChild(mealIngredient);
    }

    return ul;

}

