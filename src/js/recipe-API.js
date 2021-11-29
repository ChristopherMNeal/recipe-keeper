export default class RecipeAPI {  
  static getRecipe(ingredient) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.edamam.com/api/recipes/v2?type=public?q=${ingredient}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}

let promise = RecipeAPI.getRecipe();

promise.then(function(response) {
  return JSON.parse(response);
})






