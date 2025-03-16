import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } }); //Pass recipe data
  };

  return (
    <Card className="recipe-card bg-dark text-white" onClick={handleClick} style={{ cursor: "pointer" }}>
      <Card.Img src={recipe.image} alt={recipe.title} className="card-img" />
      <Card.ImgOverlay className="card-img-overlay">
        <Card.Title className="recipe-title">{recipe.title || "Untitled Recipe"}</Card.Title>
        <div className="recipe-tags">
          {recipe.readyInMinutes && <Badge className="recipe-tag">⏱ {recipe.readyInMinutes} min</Badge>}
          {recipe.servings && <Badge className="recipe-tag">🍽 {recipe.servings} servings</Badge>}
          {recipe.tags?.map((tag, index) => (
            <Badge key={index} className="recipe-tag">{tag}</Badge>
          ))}
        </div>
      </Card.ImgOverlay>
    </Card>
  );
};

export default RecipeCard;

