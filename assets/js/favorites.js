//for recipe api
var recipeAppID = "650e07f6";
var recipeApiKey = "61be0ff18cfbf722d2b2b7a832127896";
// for nutrition api
var nutritionAppID = "9c414ff1";
var nutritionApiKey = "8237150803039e132ee19b2cc6302444";

var inputEl = document.getElementById("search-name");
var searchButtonEl = document.getElementById("search-btn");
var containerEl = document.querySelector(".columns");
var savedRecipesArray = [];

function loadRecipes() {
    var savedRecipes = JSON.parse(localStorage.getItem("savedRecipesArray")) || [];
    for (var i=0; i < savedRecipesArray.lenght; i++) {
        searchRecipes(savedRecipes[i]);
        console.log("pull from storage", savedRecipes[i])
    }
}

async function searchRecipes() {
    var recipeUrl =
      "https://api.edamam.com/search?app_id=" +
      recipeAppID +
      "&app_key=" +
      recipeApiKey +
      "&q=" +
      currentKeyword +
      "&to=4";
    console.log(recipeUrl);
  
    var response = await fetch (recipeUrl);
    var data = await response.json();
    recipeHTML(data.hits)
    console.log (data);
  }
function recipeHTML (results) {
    console.log(savedRecipes)
    var cards = "";
    results.map(response => {

    cards +=  `
    <div class="card" id="recipe-card">
        <div class="card-image recipe-image" id="recipe-image">
            <figure class="image is-4by3">
                <img src="${response.recipe.image}" alt = "photo of recipe">
            </figure>
        </div>
        <div class="card-content" id="recipe-content">
            <div class="media-content">
                    <p class="title is-4 recipe-title" id="recipe-title">${response.recipe.label}</p>
            </div>
            <div class="recipe-description" id="recipe-description">

            </div>
            <div class="nutrition-info" id="nutrition-info">
                nutrition info
            </div>
            </div>
            <footer class="card-footer">
                <a href=" ${response.recipe.url} " class="card-footer-item view-recipe" id="view-recipe" target= "_blank">View Recipe</a>
            </footer>
        </div>`;
    containerEl.innerHTML = cards;
    })
}

loadRecipes();