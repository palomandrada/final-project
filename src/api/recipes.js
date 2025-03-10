import axios from "axios";

const API_KEY = "44123451b6b1434896b7920b7b68173f";
const API_URL = "https://api.spoonacular.com/recipes";

/**
 * Fetch recipes based on ingredients
 * @param {string} ingredients - Comma-separated list of ingredients
 */
export const fetchRecipes = async (ingredients) => {
  try {
    const response = await axios.get(`${API_URL}/findByIngredients`, {
      params: {
        ingredients,
        number: 10,
        apiKey: API_KEY,
      },
    });

    return response.data || [];
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
        number: 3,
        apiKey: API_KEY,
      },
    });

    return response.data.recipes || [];
  } catch (error) {
    console.error("Error fetching popular recipes:", error);
    return [];
  }
};
