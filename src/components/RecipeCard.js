import React, { useState, useEffect } from "react";
import { Card, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import "../styles.css";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user) {
        const favRef = doc(db, "users", user.uid, "favorites", recipe.id.toString());
        const docSnap = await getDoc(favRef);
        setIsFavorite(docSnap.exists());
      }
    };
    checkFavorite();
  }, [user, recipe.id]);

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!user) return; // Don't toggle if not logged in

    const favRef = doc(db, "users", user.uid, "favorites", recipe.id.toString());

    if (isFavorite) {
      await deleteDoc(favRef);
    } else {
      await setDoc(favRef, recipe);
    }

    setIsFavorite(!isFavorite);
  };

  const renderHeart = (
    <div className="favorite-icon" onClick={toggleFavorite}>
      {isFavorite ? <FaHeart color="#f9e389" size={20} /> : <FaRegHeart color="white" size={20} />}
    </div>
  );

  return (
    <Card className="recipe-card bg-dark text-white" onClick={handleClick} style={{ cursor: "pointer" }}>
      <Card.Img src={recipe.image} alt={recipe.title} className="card-img" />
      {user ? renderHeart : (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-top`}>Login to save this recipe</Tooltip>}
        >
          <div className="favorite-icon">{<FaRegHeart color="white" size={20} />}</div>
        </OverlayTrigger>
      )}
      <Card.ImgOverlay className="card-img-overlay">
        <Card.Title className="recipe-title text-left">{recipe.title || "Untitled Recipe"}</Card.Title>
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


