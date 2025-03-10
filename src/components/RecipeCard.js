import React from "react";
import { Card } from "react-bootstrap";

const RecipeCard = ({ recipe }) => {
  return (
    <Card className="recipe-card">
      <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>Click to see details</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
