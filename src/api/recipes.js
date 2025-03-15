import axios from "axios";

const API_KEY = "52629ed0202749539cb832fe52e74cf2";
const API_URL = "https://api.spoonacular.com/recipes";

/**
 * ✅ Utility function to remove HTML tags
 */
const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, ""); // Removes all HTML tags
};

/**
 * Fetch recipes based on ingredients
 * @param {string} ingredients - Comma-separated list of ingredients
 */
export const fetchRecipes = async (ingredients) => {
  try {
    const response = await axios.get(`${API_URL}/findByIngredients`, {
      params: {
        ingredients: ingredients, 
        number: 10, 
        apiKey: API_KEY,
      },
    });

    const detailedRecipes = await Promise.all(response.data.map(async (recipe) => {
      const detailsResponse = await axios.get(`${API_URL}/${recipe.id}/information`, {
        params: { apiKey: API_KEY }
      });

      const recipeTags = [
        ...(detailsResponse.data.diets || []),
        ...(detailsResponse.data.dishTypes || []),
        ...(detailsResponse.data.cuisines || [])
      ].filter(tag => tag); // ✅ Removes empty values

      console.log(`Recipe ID: ${recipe.id} Tags:`, recipeTags); // 🔍 Debugging output

      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: detailsResponse.data.readyInMinutes,
        servings: detailsResponse.data.servings,
        tags: recipeTags,
      };
    }));

    return detailedRecipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};



/**
 * Fetch random popular recipes
 */
export const fetchPopularRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/random`, {
      params: {
        number: 9,
        apiKey: API_KEY,
      },
    });

    return response.data.recipes.map(recipe => ({
      id: recipe.id,
      title: stripHtml(recipe.title), // ✅ Fix title formatting in popular recipes too
      image: recipe.image,
      description: stripHtml(recipe.summary) || "No description available",
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      tags: [...recipe.diets, ...recipe.dishTypes, ...recipe.cuisines].filter(tag => tag)
    }));
  } catch (error) {
    console.error("Error fetching popular recipes:", error);
    return [];
  }
};
