import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { scaler } from '.js/scaler.js';
import { RecipeAPI } from './js/recipe-API';

function displaySearchResult(result) {
  for (let i = 0; i < result.hits[i].recipe.length; i++) {
    let label = result.hits[i].recipe.label;
    let thumbNail = result.hits[i].recipe.images.THUMBNAIL.url;
    searchResultAppend(label, thumbNail);
  }
}

function searchResultAppend(label, thumbNail) {
  return `<li class ="recipeList">
  <span class="label">${label}</span>
  <span class="thumbNail">${thumbNail}</span>
  </li>`
}





// display recipe on page
// run displayRecipe() when desired recipe is selected from outcome list
// should use jQuery to clear list before displaying? Or do in this function?
// function displayRecipe(result, recipeIndex) {
//   let rI = recipeIndex;
//   for (let i = 0; i < result.hits[rI].recipe.ingredients.length; i++) {
//     let quantity = result.hits[rI].recipe.ingredients[i].quantity;
//     let measurement = result.hits[rI].recipe.ingredients[i].measurement;
//     let food = result.hits[rI].recipe.ingredients[i].food;
//     recipeListAppend(quantity, measurement, food);
//   }
// }

// run scaler on recipe
// should use jQuery to clear list before displaying? Or do in this function?
// function recipeScaler(result, recipeIndex, scaleAmount) {
//   let rI = recipeIndex;
//   for (let i = 0; i < result.hits[rI].recipe.ingredients.length; i++) {
//     let quantity = result.hits[rI].recipe.ingredients[i].quantity;
//     let measurement = result.hits[rI].recipe.ingredients[i].measurement;
//     let food = result.hits[rI].recipe.ingredients[i].food;
//     const scaledIngredient = scaler(quantity, measurement, scaleAmount);
//     measurement = scaledIngredient.join(" ");
//     recipeListAppend(quantity, measurement, food);
//   }
// }



// function recipeListAppend(quantity, measurement, food) {
//   return `<li class="ingredientItem">
//   <span class="qty">${quantity}</span>
//   <span class="msrmt">${measurement}</span>
//   <span class="food">${food}</span>
//   </li>`;
// }

// // what each should look like
// {/* <li class="ingredientItem">
//   <span class="qty"></span>
//   <span class="msrmt"></span>
//   <span class="food"></span>
// </li>  */}



async function makeApiCall(ingredient) {
  const response = await RecipeAPI.getRecipe(ingredient);
  displaySearchResult(response);
}

$(document).ready(function() {
  $('#formSearchRecipes').submit(function(event) {
    event.preventDefault();
    let userSearch  = $('#search').val();
    makeApiCall(userSearch);
  });
});
