import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import scalerLogic from './js/scaler.js';
import RecipeAPI from './js/recipe-API.js';

function displaySearchResult(result, ingredient) {
  $("#recipeList").html(`You searched recipes for:<h3>${ingredient}</h3>`);
  for (let i = 0; i < result.hits.length; i++) {
    let label = result.hits[i].recipe.label;
    let thumbNail = result.hits[i].recipe.images.THUMBNAIL.url;
    let servings = Math.round(result.hits[i].recipe.yield);
    $("#recipeList").append(`<span class="clickRecipe" id="click${i}"><li class ="recipeList" id="recipeList${i}">
    <span class="thumbNail"><img src="${thumbNail}"></span>
    <span class="label">${label}</span></span>
    <div class="recipeContents">
    Your recipe serves ${servings} people.
    <input id="scale${i}" type="number" step="0.1" placeholder="Multiply By" min="0.1">
    <button type="button" id="scaleButton${i}">scale recipe</button>
    <form class="shoppingList"><div class="individualRecipe, form-group" id="recipe${i}">
    <p>Check ingredients to add to shopping list</p>
    </div></form>
    <button type="button" class="btn btn-info" id="shoppingClick${i}">Update Shopping List</button>
    </div>
    </li>`);
    displayRecipe(result, i);
    $(`#click${i}`).click(function() {
      $(`.recipeContents`, this).slideDown();
    });
  }
}



function displayRecipe(result, recipeIndex) {
  let rI = recipeIndex;
  for (let i = 0; i < result.hits[rI].recipe.ingredients.length; i++) {
    let quantity = result.hits[rI].recipe.ingredients[i].quantity;
    let measurement = result.hits[rI].recipe.ingredients[i].measure;
    let food = result.hits[rI].recipe.ingredients[i].food.toLowerCase();
    let quantityMeasurementString = scalerLogic(quantity, measurement, 1);
    $(`#recipe${rI}`).append(`<li class="ingredientItem">
    <div class="form-check">
    <input class="form-check-input" type="checkbox" value='${quantityMeasurementString} ${food}' for="${rI}.${i}" name="shoppingItem">
    <label class="form-check-label" for="${rI}.${i}">
    <span class="qty">${quantityMeasurementString}</span>
    <span class="food">${food}</span>
    </label>
    </div>
    </li>`);
  }
  $(`#shoppingClick${rI}`).click(function() {
    let itemArray = [];
    $("input:checkbox[name=shoppingItem]:checked").each(function(){
      itemArray.push($(this).val());
    });
    for(let i=0; i < itemArray.length; i++) {
      $(".testUL").append(`<li>${itemArray[i]}</li>`);
    }
  });
  
  
  $(`#scaleButton${rI}`).click(function() {
    $(`#recipe${rI}`).empty();
    let scaleBy = $(`#scale${rI}`).val();
    if (!scaleBy) {
      scaleBy = 1;
    }
    $(`#recipe${rI}`).append("<p>Check ingredients to add to shopping list</p>");
    for (let i = 0; i < result.hits[rI].recipe.ingredients.length; i++) {
      let quantity = result.hits[rI].recipe.ingredients[i].quantity;
      let measurement = result.hits[rI].recipe.ingredients[i].measure;
      let food = result.hits[rI].recipe.ingredients[i].food.toLowerCase();
      let quantityMeasurementString = scalerLogic(quantity, measurement, scaleBy);
      $(`#recipe${rI}`).append(`<li class="ingredientItem">
      <div class="form-check">
      <input class="form-check-input" type="checkbox" value="${food}" id="check${rI}">
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
  clearFields();
  makeApiCall(userSearch);
});





// function displaySearchResult(result, ingredient) {
//   //   $("#recipeList").html(`You searched recipes for:<h3>${ingredient}</h3>`);
  //   for (let i = 0; i < result.hits.length; i++) {
    //     let label = result.hits[i].recipe.label;
    //     let thumbNail = result.hits[i].recipe.images.THUMBNAIL.url;
    //     $("#recipeList").append(`<span class="clickRecipe" id="click${i}"><li class ="recipeList" id="recipeList${i}">
    //     <span class="thumbNail"><img src="${thumbNail}"></span>
    //     <span class="label">${label}</span></span>
    //     <button type="button" class="testButton">show ingredients</button>
    //     <input id="scale${i}" type="number" step="0.1" placeholder="Scale Amount" min="0.1">
    //     <button type="button" id="scaleButton${i}">scale recipe</button>
    //     <form class="shoppingList"><div class="individualRecipe, form-group" id="recipe${i}"></div></form>
    //     </li>`);
    //     displayRecipe(result, i);
    //     $(`#click${i}`).click(function() {
      //       $(`.shoppingList`, this).slideDown();
      //     });
      //   }
      // }
      
      // function displaySearchResult(result, ingredient) {
        //   $("#recipeList").html(`<h3>${ingredient}</h3>`);
        //   for (let i = 0; i < result.hits.length; i++) {
          //     let label = result.hits[i].recipe.label;
          //     let thumbNail = result.hits[i].recipe.images.THUMBNAIL.url;
          //     $("#recipeList").append(`<li class ="recipeList" id="recipeList${i}">
          //     <span class="thumbNail"><img src="${thumbNail}"></span>
          //     <span class="label">${label}</span>
          //     <button type="button" id="showButton${i}">show ingredients</button>
          //     <button type="button" id="hideButton${i}">hide ingredients</button>
          //     <form class="shoppingList"><div class="individualRecipe, form-group" id="recipe${i}"></div></form>
          //     </li>`);
          //     displayRecipe(result, i);
          //     $(`#recipeList${i}`).click(function() {
            //       $(`#showButton${i}`).hide();
            //       $(`#hideButton${i}`).show();
            //       $(".shoppingList", this).toggleSlide();
            //       });
            //     // $(`#recipeList${i}`).click(function() {
              //     //   $(`#showButton${i}`).show();
              //     //   $(`#hideButton${i}`).hide();
              //     //   $(".shoppingList", this).slideUp();
              //     // });
              //   }
              // }
              
              
              // run scaler on recipe
              // should use jQuery to clear list before displaying? Or do in this function?
              // function recipeScaler(result, recipeIndex, scaleAmount) {
                //   let rI = recipeIndex;
                //   for (let i = 0; i < result.hits[rI].recipes.ingredients.length; i++) {
                  //     let quantity = result.hits[rI].recipe.ingredients[i].quantity;
                  //     let measurement = result.hits[rI].recipe.ingredients[i].measurement;
                  //     let food = result.hits[rI].recipe.ingredients[i].food;
                  //     const scaledIngredient = scaler(quantity, measurement, scaleAmount);
                  //     measurement = scaledIngredient.join(" ");
                  //     recipeListAppend(quantity, measurement, food);
                  //   }
                  // }
                  
                  // function recipeListAppend(quantity, measurement, food) {
                    //   if (typeof quantity === 'string') {
                      //     return `<li class="ingredientItem">
                      //     <span class="qty">${quantity}</span>
                      //     <span class="food">${food}</span>
                      //     </li>`;
                      //   } else {
                        //     return `<li class="ingredientItem">
                        //     <span class="qty">${quantity}</span>
                        //     <span class="msrmt">${measurement}</span>
                        //     <span class="food">${food}</span>
                        //     </li>`;
                        //   }
                        
                        
      
                        
  // }

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