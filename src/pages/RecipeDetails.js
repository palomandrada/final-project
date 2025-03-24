import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Badge, Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";
import { fetchRecipeDetails, fetchRecipesByTags } from "../api/recipes";
import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import '../styles/main.scss';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const loadRecipe = async () => {
      const fetchedRecipe = await fetchRecipeDetails(id);
      setRecipe(fetchedRecipe);
      setLoading(false);

      // ✅ Fetch similar recipes by tag
      const tagsToUse = fetchedRecipe?.tags?.slice(0, 2);
      if (tagsToUse && tagsToUse.length > 0) {
        const similar = await fetchRecipesByTags(tagsToUse);
        const filtered = similar.filter((r) => r.id !== parseInt(id)).slice(0, 2);
        setSimilarRecipes(filtered);
      }

      // ✅ Check if recipe is already favorited
      if (user) {
        const favRef = doc(db, "users", user.uid, "favorites", id);
        const snapshot = await getDoc(favRef);
        setIsFavorite(snapshot.exists());
      }
    };

    loadRecipe();
  }, [id, user]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleFavorite = async () => {
    if (!user) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }

    const favRef = doc(db, "users", user.uid, "favorites", id);

    if (isFavorite) {
      await deleteDoc(favRef);
      setIsFavorite(false);
    } else {
      await setDoc(favRef, recipe);
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <div className="loading-container text-center mt-5">
        <Spinner animation="border" variant="warning" />
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center mt-5">
        <p>Recipe not found.</p>
        <Button variant="dark" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="recipe-details-page">
      {/* ✅ Hero Section */}
      <div className="recipe-details-hero">
        <div
          className="recipe-hero-background"
          style={{ backgroundImage: `url(${recipe.image})` }}
        >
          <button className="go-back-button-top" onClick={handleGoBack}>
            ← Go Back
          </button>

          {/* ✅ Heart Icon */}
          <OverlayTrigger
            placement="left"
            overlay={showTooltip && !user ? <Tooltip>Login to save this recipe</Tooltip> : <></>}
          >
            <div className="favorite-icon" onClick={toggleFavorite}>
              {isFavorite ? (
                <FaHeart color="#f9e389" size={22} />
              ) : (
                <FaRegHeart color="white" size={22} />
              )}
            </div>
          </OverlayTrigger>

          <img src={recipe.image} alt={recipe.title} className="bounded-recipe-image" />
        </div>
      </div>

      {/* ✅ Title + Tags */}
      <h1 className="recipe-title">{recipe.title}</h1>
      <div className="recipe-tags">
        {recipe.readyInMinutes && (
          <Badge className="recipe-tag">⏱ {recipe.readyInMinutes} min</Badge>
        )}
        {recipe.servings && (
          <Badge className="recipe-tag">🍽 {recipe.servings} servings</Badge>
        )}
        {recipe.tags?.map((tag, index) => (
          <Badge key={index} className="recipe-tag">{tag}</Badge>
        ))}
      </div>

      {/* ✅ Main Content */}
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
            {recipe.instructions?.length > 0 ? (
              <ol className="instructions-list">
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            ) : (
              <p>No instructions available.</p>
            )}
          </Col>
        </Row>
      </Container>

      {/* ✅ Similar Recipes */}
      {similarRecipes.length > 0 && (
        <Container className="recipe-content mt-5">
          <h3 className="text-start mb-4">
            Other recipes{" "}
            {recipe.tags?.slice(0, 2).map((tag, i, arr) => (
              <span key={tag} className="text-capitalize">
                {tag}
                {i < arr.length - 1 ? " and " : ""}
              </span>
            ))}
            :
          </h3>
          <Row className="g-4">
            {similarRecipes.map((similar) => (
              <Col key={similar.id} xs={12} md={6} lg={6}>
                <RecipeCard recipe={similar} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default RecipeDetails;
