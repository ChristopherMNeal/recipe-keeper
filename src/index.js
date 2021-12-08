import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import scalerLogic from './js/scaler.js';
import RecipeAPI from './js/recipe-API.js';

function displaySearchResult(result, ingredient) {
  $("#recipeList").empty();
  $("#recipeList").html(`<div id="searchReplay"><p>You searched recipes for: <span id="inlineH3">${ingredient}</span</p></div>`);
  for (let i = 0; i < result.hits.length; i++) {
    let label = result.hits[i].recipe.label;
    let thumbNail = result.hits[i].recipe.images.REGULAR.url;
    let servings = Math.round(result.hits[i].recipe.yield);
    let link = result.hits[i].recipe.url;
    $("#recipeList").append(`
      <li class ="recipeList" id="recipeList${i}">
        <div class="clickRecipe" id="click${i}">
          <div class="row recipeTitleRow">
            <div class="col-sm-3">
              <img class="recipeImage thumbNail" src="${thumbNail}" alt="Recipe ${i} image">
            </div>
            <div class="col-sm-9 recipeNameHeader">
              <h2 class="label">${label}</h2>
            </div>
          </div>
        </div>
        <div id="recipeContents${i}">
          <p class="subnote">Original recipe serves ${servings} people.</p>
          <div class="addServForm">
            <input id="scale${i}" type="number" step="0.1" placeholder="Multiply By" min="0.1">
            <button type="button" class="button2" id="scaleButton${i}">
            Add Servings
            </button>
          </div>
          <form class="shoppingList individualRecipe form-group" id="recipe${i}">
            <p class="checkIngredients">Check ingredients to add to shopping list:</p>
          </form>
          <button type="button" class="button3" id="shoppingClick${i}">Update Shopping List</button>
          <p id="wholeRecipe">For the whole recipe, follow this <a href="${link}" target="_blank">link.</a></p>
        </div>
      </li>
      `);
    displayRecipe(result, i);
    $(`#recipeContents${i}`).hide();
    $(`#click${i}`).click(function() {
      $(`#recipeContents${i}`).slideToggle();
    });
  }
}

function displayRecipe(result, recipeIndex) {
  let rI = recipeIndex;
  let servings = result.hits[rI].recipe.yield;
  for (let i = 0; i < result.hits[rI].recipe.ingredients.length; i++) {
    let quantity = result.hits[rI].recipe.ingredients[i].quantity;
    let measurement = result.hits[rI].recipe.ingredients[i].measure;
    let food = result.hits[rI].recipe.ingredients[i].food.toLowerCase();
    let quantityMeasurementString = scalerLogic(quantity, measurement, 1);
    $(`#recipe${rI}`).append(`
    <li class="ingredientItem">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value='${quantityMeasurementString} ${food}' id="${rI}.${i}" name="shoppingItem">
        <label class="form-check-label" for="${rI}.${i}">
        <span class="qty">${quantityMeasurementString}</span>
        <span class="food">${food}</span>
        </label>
      </div>
    </li>
    `);
  }
  $(`#shoppingClick${rI}`).click(function() {
    $("#shoppingList").fadeIn();
    $(".updatedShoppingList").empty();
    let itemArray = [];
    $("input:checkbox[name=shoppingItem]:checked").each(function(){
      itemArray.push($(this).val());
    });
    for(let i=0; i < itemArray.length; i++) {
      $(".updatedShoppingList").append(`<li>${itemArray[i]}</li>`);
    }
  });
  
  
  $(`#scaleButton${rI}`).click(function() {
    $(`#recipe${rI}`).empty();
    let scaleBy = $(`#scale${rI}`).val();
    if (!scaleBy) {
      scaleBy = 1;
    }
    servings = scaleBy * result.hits[rI].recipe.yield;
    $(`#recipe${rI}`).append(`<p>Your recipe now serves ${servings}  people.</p><p>Check ingredients to add to shopping list</p>`);
    for (let i = 0; i < result.hits[rI].recipe.ingredients.length; i++) {
      let quantity = result.hits[rI].recipe.ingredients[i].quantity;
      let measurement = result.hits[rI].recipe.ingredients[i].measure;
      let food = result.hits[rI].recipe.ingredients[i].food.toLowerCase();
      let quantityMeasurementString = scalerLogic(quantity, measurement, scaleBy);
      $(`#recipe${rI}`).append(`<li class="ingredientItem">
      <div class="form-check">
      <input class="form-check-input" type="checkbox" value='${quantityMeasurementString} ${food}' id="${rI}.${i}" name="shoppingItem">
      <label class="form-check-label" for="check${rI}">
      <span class="qty">${quantityMeasurementString}</span>
      <span class="food">${food}</span>
      </label>
      </div>
      </li>`);
    }
  });
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
  $("#greeting").hide();
  if (!userSearch) {
    $("#recipeList").html("<div id='searchError'><h3>Please enter a search term.</h3></div>");
    return false;
  }
  clearFields();
  makeApiCall(userSearch);
});

$(window).scroll(function(){ 
  var $el = $('#shoppingList'); 
  var isPositionFixed = ($el.css('position') == 'fixed');
  if ($(this).scrollTop() > 600 && !isPositionFixed){ 
    $el.css({'position': 'fixed', 'top': '0px'}); 
  }
  if ($(this).scrollTop() < 600 && isPositionFixed){
    $el.css({'position': 'static', 'top': '0px'}); 
  } 
});