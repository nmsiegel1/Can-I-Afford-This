//for recipe api
var recipeAppID = "650e07f6";
var recipeApiKey = "61be0ff18cfbf722d2b2b7a832127896";

var inputEl = document.getElementById("search-name");
var searchButtonEl = document.getElementById("search-btn");
var randomButtonEl = document.getElementById("random-btn");
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

  var response = await fetch(recipeUrl);
  var data = await response.json();
  recipeHTML(data.hits);
  console.log(data);
}

function recipeHTML(results) {
  console.log(results);
  var cards = "";
  results.map((response) => {
    cards += `
    <div class="card" id="recipe-card">
        <div class="card-image recipe-image" id="recipe-image">
            <figure class="image is-4by3">
                <img src="${response.recipe.image}" alt = "photo of recipe">
            </figure>
        </div>
        <div class="card-content" id="recipe-content">
            <div class="media-content">
                    <p class="title is-4 recipe-title" id="recipe-title">
                    ${response.recipe.label}
                    </p>
                    <h3 class = "source">
                    Source: ${response.recipe.source}
            </div>
            <div class="nutrition-info" id="nutrition-info">
                Servings: ${response.recipe.yield} <br>
                Calories: ${response.recipe.calories.toFixed(0)}
            </div>
            <footer class="card-footer">
                <a href=" ${response.recipe.url} " class="card-footer-item view-recipe" id="view-recipe" target= "_blank">View Recipe</a>
                <a href="#" class="card-footer-item save-recipe" id="save-recipe">Save</a>
            </footer>
        </div>`;
    containerEl.innerHTML = cards;
  });
}

randomButtonEl.addEventListener("click", getRandomRecipe)

async function getRandomRecipe() {
  var randomUrl = "https://themealdb.com/api/json/v1/1/random.php"
  console.log(randomUrl)
  var response = await fetch(randomUrl);
  var data = await response.json();
  randomHTML(data.meals);
}

function randomHTML(results) {
  console.log(results);
  var cards = "";
  results.map((response) => {
    cards += `
    <div class="card" id="recipe-card">
        <div class="card-image recipe-image" id="recipe-image">
            <figure class="image is-4by3">
                <img src="${response.strMealThumb}" alt = "photo of recipe">
            </figure>
        </div>
        <div class="card-content" id="recipe-content">
            <div class="media-content">
                    <p class="title is-4 recipe-title" id="recipe-title">
                    ${response.strMeal} 
                    </p>
            </div>
            <footer class="card-footer">
                <a href=" ${response.strSource} " class="card-footer-item view-recipe" id="view-recipe" target= "_blank">View Recipe</a>
                <a href="#" class="card-footer-item save-recipe" id="save-recipe">Save</a>
            </footer>
        </div>`;
    containerEl.innerHTML = cards;
  });
}
