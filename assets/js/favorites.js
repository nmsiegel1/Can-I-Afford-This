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
    var favoriteRecipes = JSON.parse(localStorage.getItem("savedRecipes"))|| [];
    console.log("favorite recipe", favoriteRecipes);
    var testRecipeId = "84d3dcca84d9d26535474ea24b15e9c3";
     for (var i=0; i < favoriteRecipes.length; i++) {
         var recipeList = favoriteRecipes[i];
        searchRecipes(recipeList);
        }
    }



    async function searchRecipes(recipeList) {
      
    var recipeUrl =
      "https://api.edamam.com/search?app_id=" +
      recipeAppID +
      "&app_key=" +
      recipeApiKey +
      "&q=" +
     recipeList;
    //   currentKeyword +
    //   "&to=4";
    console.log("recipe url", recipeUrl);
    var response = await fetch (recipeUrl);
    var data = await response.json();
    recipeHTML(data.hits)
    console.log ("data", data);
    var results = data.hits;
};


function recipeHTML (results) {
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