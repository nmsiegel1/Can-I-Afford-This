//global variables
var recipeAppID = "650e07f6";
var recipeApiKey = "61be0ff18cfbf722d2b2b7a832127896";

var inputEl = document.getElementById("search-name");
var searchButtonEl = document.getElementById("search-btn");
var randomButtonEl = document.getElementById("random-btn");
var containerEl = document.querySelector("#recipe-list");
var savedRecipesArray = [];

// eventlistener that take the input value and sends it to the searchRecipe()
searchButtonEl.addEventListener("click", function (event) {
  event.preventDefault();
  var keyword = inputEl.value;
  searchRecipes(keyword);
});

// this function takes the keyword and runs it through the api
async function searchRecipes(currentKeyword) {
  var recipeUrl =
    "https://api.edamam.com/search?app_id=" +
    recipeAppID +
    "&app_key=" +
    recipeApiKey +
    "&q=" +
    currentKeyword +
    "&to=12";

  var response = await fetch(recipeUrl);
  var data = await response.json();
  recipeHTML(data.hits);
}

// this function dynamically creates the cards on the screen from the data fetched from the api
function recipeHTML(results) {
    var cards = "";
  results.map((response) => {
    var recipeId = response.recipe.uri.split("_")[1];
    cards += `
    <div class="block"></div>
    <div class="card column" id="recipe-card">
        <div class="card-image recipe-image" id="recipe-image">
            <figure class="image is-4by3">
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
                Servings: ${response.recipe.yield} <br>
                Calories: ${response.recipe.calories.toFixed(0)}
            </div>
            <footer class="card-footer">
                <a href=" ${
                  response.recipe.url
                } " class="card-footer-item view-recipe" id="view-recipe" target= "_blank">View Recipe</a>
                <a href="javascript:void()" class="card-footer-item save-btn" id="${response.recipe.uri.split("_")[1]}">Save</a>
            </footer>
        </div>
        </div>`;
        containerEl.innerHTML = cards;
  });
}

// This is the eventlistener for the feeling lucky button/random recipe button
randomButtonEl.addEventListener("click", function (event) {
  event.preventDefault();
  getRandomRecipe();
});

// this funciton calls the second api to fetch a random recipe
async function getRandomRecipe() {
  var randomUrl = "https://themealdb.com/api/json/v1/1/random.php";
  var response = await fetch(randomUrl);
  var data = await response.json();
  randomHTML(data.meals);
}

// this function displays the random recipe on the screen in a dynamically created card
function randomHTML(results) {
  var cards = "";
  results.map((response) => {
    cards += `
        <div class="block is-full random">
        <div class="card column" id="recipe-card">
        <div class="card-image recipe-image" id="recipe-image">
        <figure class="image is-4by3">
        <img src="${response.strMealThumb}" alt = "photo of recipe">
        </figure>
        </div>
        <div class="card-content" id="recipe-content">
        <div class="media-content">
        <p class="title is-four-fifths recipe-title" id="recipe-title">
        ${response.strMeal}
        </p>
        </div>
        <footer class="card-footer">
        <a href=" ${response.strSource} " class="card-footer-item view-recipe" id="view-recipe" target= "_blank">View Recipe</a>
        </footer>
        </div>
        </div>`;
    containerEl.innerHTML = cards;
  });
}

// this is the click element for the save button that saves a recipe to local storage
$("body").on("click", ".save-btn", function () {
  var recipeEl = $(this).attr("id");
  if (!savedRecipesArray.includes(recipeEl)){
  savedRecipesArray.push(recipeEl);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipesArray));
  }
  showMessage();
});

function showMessage(){
    var messageEl = document.querySelector("#save-message");
    messageEl.style.visibility = "visible";
    setTimeout(() => {
        messageEl.style.visibility = "hidden";
    }, 1000);
}

