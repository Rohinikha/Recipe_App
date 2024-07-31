//id and class value  accesses


const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeContainer  = document.querySelector('.recipe-container');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


const fetchApi = async (query) =>{
    recipeContainer.innerHTML="<h2>fetchin recipe...</h2>";

try{
    

    const fetchData =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    const response = await fetchData.json();
    
    recipeContainer.innerHTML = "";
   response.meals.forEach(meal => {


    recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');

    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strMeal}</p>
    <p><span>${meal.strArea}</span>Dish</p>
    <p>Belongs to<span>${meal.strCategory}</span>Category</p>

    `

    const button =document.createElement('button');
    button.textContent='view Recipe';
    recipeDiv.appendChild(button);

    //addig event listener
    button.addEventListener('click',()=>{
        openRecipePopup(meal);

    })
    

    recipeContainer.appendChild(recipeDiv);
    
   });

}catch(error){
   
    recipeContainer.innerHTML="<h2>Error in fetching recipes recipe...</h2>";
}




}

//function to fetch Ingreditents  and messurement

const fetchIngreditents = (meal)=>{


let ingredientsList = "";
for(let i=1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
        const measure = meal[`strMeasure${i}`];
        ingredientsList += `<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
}return ingredientsList;
}

const openRecipePopup = (meal)=>{
  recipeDetailsContent.innerHTML = 
 `
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class="ingredientList">${fetchIngreditents(meal)}</ul>

<div class="recipeinstructions">
  <h3>Instructions:</h3>
  <p >${meal.strInstructions}</p>
  </div>

  `  
  

  recipeDetailsContent.parentElement.style.display ="block";
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display ="none";

});
searchBtn.addEventListener('click',(e)=>{
  e.preventDefault(); 
  searchInput = searchBox.value.trim(); 
  if(!searchInput){
    recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
    return;
  }
fetchApi(searchInput);

});
