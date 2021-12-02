export default class RecipeAPI {
  static async getRecipe(ingredient) {
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=333278b3&app_key=893a43aa69a3f1d55d2c8be676853d44`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}

//https://api.edamam.com/api/recipes/v2?type=public&q=chocolate&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}

//APP_KEY:f8531e37d7f0b4ec969509366ff9dff2
//APP_ID:2d363600;

//ella's:
//APP_KEY=893a43aa69a3f1d55d2c8be676853d44
//APP_ID=333278b3



