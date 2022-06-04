//for recipe api
var recipeAppID = "650e07f6";
var recipeApiKey = "61be0ff18cfbf722d2b2b7a832127896";

// other global variables
var savedRecipesArray = [];

// this function gets the data from localstorage and sends it to the searchRecipe()
function loadRecipes() {
  var favoriteRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  for (var i = 0; i < favoriteRecipes.length; i++) {
    var recipeList = favoriteRecipes[i];
    searchRecipes(recipeList);
  }
}

// This function sends the saved data through the api
async function searchRecipes(recipeList) {
  var recipeUrl =
    "https://api.edamam.com/search?app_id=" +
    recipeAppID +
    "&app_key=" +
    recipeApiKey +
    "&q=" +
    recipeList;

  var response = await fetch(recipeUrl);
  var data = await response.json();
  recipeHTML(data.hits);
  var results = data.hits;
}

// this function renders the cards dynamically on the screen with the data fetched from the api
function recipeHTML(results) {
  results.map((response) => {
    var card = `<div class="block"></div>
    <div class="card column margin-top" id="${
      response.recipe.uri.split("_")[1]
    }">
        <div class="card-image recipe-image" id="recipe-image">
            <figure class="image is-half">
                <img src="${response.recipe.image}" alt = "photo of recipe">
            </figure>
        </div>
        <div class="card-content" id="recipe-content">
            <div class="media-content">
                    <p class="title is-4 recipe-title" id="recipe-title">${
                      response.recipe.label
                    }</p>
            </div>
            <div class="recipe-description" id="recipe-description">

            </div>
            <div class="nutrition-info" id="nutrition-info">
                nutrition info
            </div>
            </div>
            <footer class="card-footer">
                <a href=" ${
                  response.recipe.url
                } " class="card-footer-item view-recipe" id="view-recipe" target= "_blank">View Recipe</a>
            </footer>
            </div>
        </div>`;
    $("#favorite-recipes").append(card);
  });
}

// calls the loadRecipes() at page load
loadRecipes();
