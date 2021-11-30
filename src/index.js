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
    $("#recipeList").append(`<li class ="clickRecipe" id="${i}">
    <span class="thumbNail"><img src="${thumbNail}"></span>
    <span class="label">${label}</span>
    <button type="button" class="testButton">show ingredients</button>
    <div class="individualRecipe" id="recipe${i}"></div>
    </li>`);
    displayRecipe(result, i);
    $(`#${i}`).click(function() {
      $(".individualRecipe", this).toggle();
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
    <span class="qty">${quantity}</span>
    <span class="msrmt">${measurement}</span>
    <span class="food">${food}</span>
    </li>`);
  }
}

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

// $(".thumbNail").click(function() {
//   alert("works!");
//   $(".individualRecipe").toggle();
// });

//   $("p").click(function() {
//     $(".walrus-showing").toggle();
//     $(".walrus-hidden").toggle();
//   });