import React from "react";
import { Card, Badge } from "react-bootstrap";

const RecipeCard = ({ recipe }) => {
  return (
    <Card className="recipe-card bg-dark text-white">
      <Card.Img src={recipe.image} alt={recipe.title} className="card-img" />
      <Card.ImgOverlay className="card-img-overlay">
        {/* ✅ Ensure title exists */}
        <Card.Title className="recipe-title">{recipe.title || "Untitled Recipe"}</Card.Title>

        {/* ✅ Check if recipe.tags exists before mapping */}
        <div className="recipe-tags">
          {recipe.readyInMinutes && <Badge className="recipe-tag">⏱ {recipe.readyInMinutes} min</Badge>}
          {recipe.servings && <Badge className="recipe-tag">🍽 {recipe.servings} servings</Badge>}
          {recipe.tags?.length > 0 && recipe.tags.map((tag, index) => (
            <Badge key={index} className="recipe-tag">{tag}</Badge>
          ))}
        </div>
      </Card.ImgOverlay>
    </Card>
  );
};

export default RecipeCard;
