import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Badge, Spinner } from "react-bootstrap";
import { fetchRecipeDetails } from "../api/recipes";
import "../styles.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      const fetchedRecipe = await fetchRecipeDetails(id);
      setRecipe(fetchedRecipe);
      setLoading(false);
    };

    loadRecipe();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="warning" />
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center mt-5">
        <p>Recipe not found.</p>
        <Button variant="dark" onClick={handleGoBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="recipe-details-page">
      {/* ✅ Full-width background image */}
      <div className="recipe-details-header" style={{ backgroundImage: `url(${recipe.image})` }}>
        <div className="overlay">
          <Button variant="dark" onClick={handleGoBack} className="go-back-button">← Go Back</Button>
          <h1 className="recipe-title">{recipe.title}</h1>
          <div className="recipe-tags">
            {recipe.readyInMinutes && <Badge className="recipe-tag">⏱ {recipe.readyInMinutes} min</Badge>}
            {recipe.servings && <Badge className="recipe-tag">🍽 {recipe.servings} servings</Badge>}
            {recipe.tags?.map((tag, index) => (
              <Badge key={index} className="recipe-tag">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <Row>
          {/* ✅ Left Section: Ingredients */}
          <Col lg={4} className="ingredients-section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {recipe.ingredients?.length > 0 ? (
                recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
              ) : (
                <p>No ingredients available.</p>
              )}
            </ul>
          </Col>

          {/* ✅ Right Section: Instructions */}
          <Col lg={8} className="instructions-section">
            <h3>Instructions</h3>
            {recipe.instructions?.length > 0 ? (
              <ol className="instructions-list">
                {recipe.instructions.map((step, index) => <li key={index}>{step}</li>)}
              </ol>
            ) : (
              <p>No instructions available.</p>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RecipeDetails;
