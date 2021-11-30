export default class RecipeAPI {  
  static async getRecipe(ingredient) {
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=broccoli&app_id=3ba161e2&app_key=a4e4701171c306da3f5abfec16c0b11c`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}





