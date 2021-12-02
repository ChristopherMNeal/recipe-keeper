export default class RecipeAPI {
  static async getRecipe(ingredient) {
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}
