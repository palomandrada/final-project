import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import NavigationBar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { fetchRecipes, fetchPopularRecipes } from "../api/recipes";
import "../styles.css";

const SearchResults = () => {
  const location = useLocation();
  const [recipes, setRecipes] = useState(location.state?.recipes || []);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [showPopular, setShowPopular] = useState(!location.state?.fromSearch); // ✅ Show popular recipes ONLY if not coming from search

  useEffect(() => {
    if (recipes.length === 0 && showPopular) {
      const getPopularRecipes = async () => {
        const data = await fetchPopularRecipes();
        setPopularRecipes(data);
      };
      getPopularRecipes();
    }
  }, [recipes, showPopular]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    try {
      const fetchedRecipes = await fetchRecipes(query);
      setRecipes(fetchedRecipes);
      setShowPopular(false); // ✅ Hide popular recipes when a search is made
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="app-container">
      <NavigationBar />

      {/* ✅ Search Bar Always Visible */}
      <div className="search-container">
        <h2 className="text-white text-center mt-4">Search for More Recipes</h2>
        <SearchBar onSearch={handleSearch} layout="inline" />

      </div>

      {/* ✅ Show Popular Recipes ONLY if not searching */}
      {showPopular && popularRecipes.length > 0 && (
        <Container className="recipe-results">
          <h3 className="text-white text-center mt-4">🔥 Popular Recipes of the Week</h3>
          <Row className="g-4">
            {popularRecipes.map((recipe) => (
              <Col key={recipe.id} xs={12} sm={6} md={4}>
                <Card className="recipe-card">
                  <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* ✅ Display Search Results */}
      <Container className="recipe-results mt-5 pt-4">
        <Row className="g-4">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Col key={recipe.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="recipe-card">
                  <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
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
