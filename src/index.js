import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import { scaler } from '.js/scaler.js';
import RecipeAPI from './js/recipe-API.js';

function displaySearchResult(result) {
  for (let i = 0; i < result.hits.length; i++) {
    let label = result.hits[i].recipe.label;
    let thumbNail = result.hits[i].recipe.images.THUMBNAIL.url;
    $("#recipeList").append(`<li class ="clickRecipe" id="${i}">
    <span class="label">${label}</span>
    <span class="thumbNail">${thumbNail}</span>
    <div class="individualRecipe" id="recipe${i}"></div>
    </li>`);
    displayRecipe(result, i);
  }
}

function displayRecipe(result, recipeIndex) {
  let rI = recipeIndex;
  for (let i = 0; i < result.hits[rI].recipe.ingredients.length; i++) {
    let quantity = result.hits[rI].recipe.ingredients[i].quantity;
    let measurement = result.hits[rI].recipe.ingredients[i].measure;
    let food = result.hits[rI].recipe.ingredients[i].food;
    $(`#recipe${rI}`).append(`<li class="ingredientItem">
    <span class="qty">${quantity}</span>
    <span class="msrmt">${measurement}</span>
    <span class="food">${food}</span>
    </li>`);
  }
}


async function makeApiCall(ingredient) {
  const response = await RecipeAPI.getRecipe(ingredient);
  displaySearchResult(response);
}


$('#initialSearchSubmit').click(function(event) {
  event.preventDefault();
  let userSearch  = $('#search').val();
  makeApiCall(userSearch);
});

$('.clickRecipe').click(function(event) {
  $(".individualRecipe").toggle(500);
});
