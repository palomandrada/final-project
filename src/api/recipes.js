import axios from "axios";

const API_KEY = "44123451b6b1434896b7920b7b68173f";
const API_URL = "https://api.spoonacular.com/recipes";

/**
 * ✅ Utility function to remove HTML tags
 */
const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, ""); // Removes all HTML tags
};

/**
 * ✅ Fetch recipes based on ingredients
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

      const data = detailsResponse.data;

      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: data.readyInMinutes || "N/A",
        servings: data.servings || "N/A",
        tags: [...(data.diets || []), ...(data.dishTypes || []), ...(data.cuisines || [])].filter(Boolean),
      };
    }));

    return detailedRecipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

/**
 * ✅ Fetch full recipe details by ID (Ensures no crashes)
 */
export const fetchRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/information`, {
      params: { apiKey: API_KEY },
    });

    const data = response.data;

    return {
      id: data.id,
      title: data.title,
      image: data.image,
      readyInMinutes: data.readyInMinutes || "N/A",
      servings: data.servings || "N/A",
      tags: [...(data.diets || []), ...(data.dishTypes || []), ...(data.cuisines || [])].filter(Boolean),
      ingredients: data.extendedIngredients?.map((ingredient) => ingredient.original) || ["No ingredients available."],
      instructions: data.analyzedInstructions?.length > 0
        ? data.analyzedInstructions[0].steps.map((step) => step.step)
        : ["No instructions available."],
    };
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};


/**
 * ✅ Fetch random popular recipes
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
      title: stripHtml(recipe.title),
      image: recipe.image,
      description: stripHtml(recipe.summary) || "No description available",
      readyInMinutes: recipe.readyInMinutes || "N/A",
      servings: recipe.servings || "N/A",
      tags: [...recipe.diets, ...recipe.dishTypes, ...recipe.cuisines].filter(Boolean)
    }));
  } catch (error) {
    console.error("Error fetching popular recipes:", error);
    return [];
  }
};
