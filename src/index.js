import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { scaler } from '.js/scaler.js';






// display recipe on page
// run displayRecipe() when desired recipe is selected from outcome list
// should use jQuery to clear list before displaying? Or do in this function?
function displayRecipe(result, recipeIndex) {
  let rI = recipeIndex;
  for (let i = 0; i < result.hits[rI].recipes.ingredients.length; i++) {
    let quantity = result.hits[rI].recipe.ingredients[i].quantity;
    let measurement = result.hits[rI].recipe.ingredients[i].measurement;
    let food = result.hits[rI].recipe.ingredients[i].food;
    recipeListAppend(quantity, measurement, food);
  }
}

// run scaler on recipe
// should use jQuery to clear list before displaying? Or do in this function?
function recipeScaler(result, recipeIndex, scaleAmount) {
  let rI = recipeIndex;
  for (let i = 0; i < result.hits[rI].recipes.ingredients.length; i++) {
    let quantity = result.hits[rI].recipe.ingredients[i].quantity;
    let measurement = result.hits[rI].recipe.ingredients[i].measurement;
    let food = result.hits[rI].recipe.ingredients[i].food;
    const scaledIngredient = scaler(quantity, measurement, scaleAmount);
    measurement = scaledIngredient.join(" ");
    recipeListAppend(quantity, measurement, food);
  }
}

function recipeListAppend(quantity, measurement, food) {
  if (typeof quantity === 'string') {
    return `<li class="ingredientItem">
    <span class="qty">${quantity}</span>
    <span class="food">${food}</span>
    </li>`;
  } else {
    return `<li class="ingredientItem">
    <span class="qty">${quantity}</span>
    <span class="msrmt">${measurement}</span>
    <span class="food">${food}</span>
    </li>`;
  }
}

// what each should look like
{/* <li class="ingredientItem">
  <span class="qty"></span>
  <span class="msrmt"></span>
  <span class="food"></span>
</li>  */}
