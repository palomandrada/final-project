import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Removed `useNavigate`
import { Card, Container, Row, Col } from "react-bootstrap";
import NavigationBar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { fetchRecipes, fetchPopularRecipes } from "../api/recipes";
import "../styles.css";

const SearchResults = () => {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);

  // Load initial recipes from navigation state (if any)
  useEffect(() => {
    if (location.state?.recipes) {
      setRecipes(location.state.recipes);
    } else {
      // Fetch popular recipes if no search results exist
      const getPopularRecipes = async () => {
        const data = await fetchPopularRecipes();
        setPopularRecipes(data);
      };
      getPopularRecipes();
    }
  }, [location.state]);

  // Handle searching
  const handleSearch = async (query) => {
    const formattedQuery = query.replace(/\s+/g, "").toLowerCase();
    const fetchedRecipes = await fetchRecipes(formattedQuery);

    // Update state instead of navigating
    setRecipes(fetchedRecipes);
    setPopularRecipes([]); // Hide popular recipes when searching
  };

  return (
    <div className="app-container">
      <NavigationBar />

      {/* Search Bar */}
      <div className="search-container">
        <h2 className="text-white text-center mt-4">Search for More Recipes</h2>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Show Popular Recipes ONLY if no search results exist */}
      {recipes.length === 0 && popularRecipes.length > 0 && (
        <Container className="recipe-results">
          <h3 className="text-white text-center mt-4">🔥 Popular Recipes of the Week</h3>
          <Row className="g-4">
            {popularRecipes.map((recipe) => (
              <Col key={recipe.id} xs={12} sm={6} md={4}>
                <Card className="recipe-card">
                  <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>Try this delicious meal!</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* Display Search Results */}
      <Container className="recipe-results">
        <Row className="g-4">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Col key={recipe.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="recipe-card">
                  <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>Click to see details</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-white mt-3 text-center">No recipes found.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default SearchResults;
