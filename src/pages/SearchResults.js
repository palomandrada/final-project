import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NavigationBar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { fetchRecipes, fetchPopularRecipes } from "../api/recipes";
import "../styles.css";

const SearchResults = () => {
  const location = useLocation();
  const [recipes, setRecipes] = useState(location.state?.recipes || []);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [showPopular, setShowPopular] = useState(!location.state?.fromSearch);
  const [hasSearched, setHasSearched] = useState(!!location.state?.fromSearch);

  useEffect(() => {
    if (recipes.length === 0 && showPopular) {
      const getPopularRecipes = async () => {
        const data = await fetchPopularRecipes();
        console.log("Fetched Popular Recipes:", data); // ✅ Debugging
        setPopularRecipes(data.slice(0, 9)); // ✅ Ensure we're displaying 9 recipes
      };
      getPopularRecipes();
    }
  }, [recipes, showPopular]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    try {
      const fetchedRecipes = await fetchRecipes(query);
      setRecipes(fetchedRecipes);
      setShowPopular(false);
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="app-container search-results-bg">
      <NavigationBar />

      {/* ✅ Search Bar Section */}
      <div className="search-container search-box">
        <h2 className="text-white text-center">Search for More Recipes</h2>
        <SearchBar onSearch={handleSearch} layout="inline" />
      </div>

      {/* ✅ Popular Recipes Section */}
      {showPopular && popularRecipes.length > 0 && (
        <Container className="recipe-results">
          <h3 className="text-dark text-center mt-4">🍽️ Searching for ideas? Try these tasty recipes</h3>
          <Row className="g-4">
            {popularRecipes.map((recipe) => (
              <Col key={recipe.id} xs={12} sm={6} md={4} lg={4}> {/* ✅ Always 3 columns */}
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* ✅ Show Search Results */}
      {recipes.length > 0 && (
        <Container className="recipe-results">
          {/* ✅ Show title above results */}
          <h3 className="text-white text-center mt-4">Recipes with {location.state?.searchQuery}:</h3>
          <Row className="g-4">
            {recipes.map((recipe) => (
              <Col key={recipe.id} xs={12} sm={6} md={4} lg={4}> {/* ✅ Ensures 3 columns */}
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* ✅ Show "No recipes found" message ONLY if a search was made */}
      {hasSearched && recipes.length === 0 && (
        <p className="text-white mt-3 text-center">No recipes found.</p>
      )}
    </div>
  );
};

export default SearchResults;
