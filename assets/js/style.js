//for recipe api
var recipeAppID = "650e07f6";
var recipeApiKey = "61be0ff18cfbf722d2b2b7a832127896";
// for nutrition api
var nutritionAppID = "9c414ff1";
var nutritionApiKey = "8237150803039e132ee19b2cc6302444";

var inputEl = document.getElementById("search-name");
var searchButtonEl = document.getElementById("search-btn");
var containerEl = document.querySelector(".columns");

searchButtonEl.addEventListener("click", function (event) {
  event.preventDefault();
  var keyword = inputEl.value;
  searchRecipes(keyword);
});

async function searchRecipes(currentKeyword) {
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
    console.log(results)
    var cards = "";
    results.map(response => {
        var recipeId = response.recipe.uri;
        console.log("recipeId", recipeId);
        splitId = recipeId.split("_")[1];
    console.log("split id", splitId);
        
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
                <a href="javascript:null" onClick="javascript:saveRecipe(splitId)" class="card-footer-item save-recipe" id="save-recipe">Save</a>
            </footer>
        </div>`;
    containerEl.innerHTML = cards;
    })
}

function saveRecipe(splitId) {
    console.log("save function Id", splitId);
    
}
document.addEventListener("click", (event) => {
    if (event.target.id == "save-recipe") {
        // var addHeart = document.querySelector(".media-left");
        // addHeart.classList.remove("hide");
        // var uri = event.target.parentNode.parentNode.response.uri;
        // console.log("uri console", response.uri)
    }
})