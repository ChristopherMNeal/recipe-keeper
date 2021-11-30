import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import { scaler } from '.js/scaler.js';
import RecipeAPI from './js/recipe-API.js';


function displaySearchResult(result, ingredient) {
  $("#recipeList").html(`<h3>${ingredient}</h3>`);
  for (let i = 0; i < result.hits.length; i++) {
    let label = result.hits[i].recipe.label;
    let thumbNail = result.hits[i].recipe.images.THUMBNAIL.url;
    $("#recipeList").append(`<span class="clickRecipe" id="click${i}"><li class ="recipeList" id="recipeList${i}">
    <span class="thumbNail"><img src="${thumbNail}"></span>
    <span class="label">${label}</span></span>
    <button type="button" class="testButton">show ingredients</button>
    <form class="shoppingList"><div class="individualRecipe, form-group" id="recipe${i}"></div></form>
    </li>`);
    displayRecipe(result, i);
    $(`#click${i}`).click(function() {
      $(`.shoppingList`, this).toggle();
    });
  }
}

function displayRecipe(result, recipeIndex) {
  let rI = recipeIndex;
  for (let i = 0; i < result.hits[rI].recipe.ingredients.length; i++) {
    let quantity = result.hits[rI].recipe.ingredients[i].quantity;
    let measurement = result.hits[rI].recipe.ingredients[i].measure;
    let food = result.hits[rI].recipe.ingredients[i].food;
    $(`#recipe${rI}`).append(`<li class="ingredientItem">
    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="${food}" id="check${rI}">
    <label class="form-check-label" for="check${rI}">
    <span class="qty">${quantity}</span>
    <span class="msrmt">${measurement}</span>
    <span class="food">${food}</span>
    </label>
    </div>
    </li>`);
  }
}


/* <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
  <label class="form-check-label" for="defaultCheck1">
    Default checkbox
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
  <label class="form-check-label" for="defaultCheck2">
    Disabled checkbox
  </label>
</div> */



async function makeApiCall(ingredient) {
  const response = await RecipeAPI.getRecipe(ingredient);
  displaySearchResult(response, ingredient);
}

function clearFields() {
  $("#recipeList").empty();
  $('#search').val("");
}

$('#initialSearchSubmit').click(function(event) {
  event.preventDefault();
  let userSearch  = $('#search').val();
  clearFields();
  makeApiCall(userSearch);
});