import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Accordion, Form, Button } from "react-bootstrap";
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
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || "");
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    if (recipes.length === 0 && showPopular) {
      const getPopularRecipes = async () => {
        const data = await fetchPopularRecipes();
        setPopularRecipes(data.slice(0, 9));
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
      setSearchQuery(query);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleFilterChange = (tag) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(tag) ? prevFilters.filter((t) => t !== tag) : [...prevFilters, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  const filteredRecipes = selectedFilters.length
    ? recipes.filter((recipe) => recipe.tags?.some((tag) => selectedFilters.includes(tag)))
    : recipes;

  const filterCategories = {
    "Dish Type": ["beverage", "dinner", "dessert", "lunch", "main course", "main dish", "side dish"].sort(),
    "Allergens & Restrictions": ["dairy free", "gluten free", "lacto ovo vegetarian", "pescatarian", "vegan"].sort(),
    "Diet": ["fodmap friendly", "ketogenic", "paleolithic", "primal", "southern", "whole 30"].sort(),
  };

  return (
    <div className="app-container search-results-bg">
      <NavigationBar />

      <div className="search-container search-box">
        <h2 className="search-title">Search for More Recipes</h2>
        <SearchBar onSearch={handleSearch} layout="inline" />
      </div>

      <Container fluid className="content-container">
        <Row>
          <Col>
            <Container className="recipe-results">
              {/* ✅ Show title only if a search has been made */}
              {hasSearched && (
                <h3 className="text-dark text-center mt-4">Recipes with {searchQuery}:</h3>
              )}

              {/* ✅ Filters ALWAYS remain visible, even when no recipes match */}
              {hasSearched && (
                <Accordion defaultActiveKey={null} className="filters-accordion mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Filters</Accordion.Header>
                    <Accordion.Body>
                      <div className="filters-bar">
                        {Object.entries(filterCategories).map(([category, tags]) => (
                          <div key={category} className="filter-category">
                            <h6>{category}</h6> {/* ✅ Left-aligned title */}
                            <div className="filter-options"> {/* ✅ Left-aligned checkbox group */}
                              {tags.map((tag) => (
                                <Form.Check
                                  inline
                                  key={tag}
                                  type="checkbox"
                                  label={tag}
                                  checked={selectedFilters.includes(tag)}
                                  onChange={() => handleFilterChange(tag)}
                                  className="filter-checkbox custom-checkbox"
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* ✅ Show Clear Filters button only when filters are active */}
                      {selectedFilters.length > 0 && (
                        <div className="text-center mt-3">
                          <Button variant="dark" onClick={clearAllFilters} className="clear-filters-button">
                            Clear All Filters
                          </Button>
                        </div>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}

              {/* ✅ Show Recipe Cards ONLY when there are results */}
              {hasSearched && filteredRecipes.length > 0 ? (
                <Row className={`g-4 mt-3 ${filteredRecipes.length === 1 ? "single-recipe-row" : ""}`}>
                  {filteredRecipes.map((recipe) => (
                    <Col key={recipe.id} xs={12} sm={6} md={6} lg={6}>
                      <RecipeCard recipe={recipe} />
                    </Col>
                  ))}
                </Row>
              ) : (
                /* ✅ Show "No recipes found" message only after a search */
                hasSearched && <p className="text-dark mt-3 text-center">Sorry! We could not find any recipes.</p>
              )}
            </Container>

            {/* ✅ Popular Recipes Section (Only if no search has been made) */}
            {showPopular && popularRecipes.length > 0 && (
              <Container className="recipe-results">
                <h3 className="text-dark text-center">🍽️ Searching for ideas? Try these tasty recipes</h3>
                <Row className="g-4">
                  {popularRecipes.map((recipe) => (
                    <Col key={recipe.id} xs={12} sm={6} md={6} lg={6}>
                      <RecipeCard recipe={recipe} />
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchResults;

