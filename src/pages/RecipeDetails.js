import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { fetchRecipeDetails } from "../api/recipes"; // ✅ Import the function
import "../styles.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      const fetchedRecipe = await fetchRecipeDetails(id); // ✅ Fetch recipe details
      setRecipe(fetchedRecipe);
      setLoading(false);
    };

    loadRecipe();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // ✅ Returns to the previous page while keeping filters & search
  };

  if (loading) {
    return <p className="text-center mt-5">Loading recipe...</p>;
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

      <Container className="recipe-content mt-4">
        <Row>
          <Col lg={4} className="ingredients-section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </Col>

          <Col lg={8} className="instructions-section">
            <h3>Instructions</h3>
            <ol className="instructions-list">
              {recipe.instructions?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecipeDetails;
