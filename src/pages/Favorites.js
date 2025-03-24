import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import '../styles/main.scss';

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      const favsRef = collection(db, "users", user.uid, "favorites");
      const snapshot = await getDocs(favsRef);
      const favs = snapshot.docs.map(doc => doc.data());
      setFavorites(favs);
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="favorites-empty-state">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
          alt="Favorites Illustration"
          className="favorites-illustration"
        />
        <h3 className="text-light">Please log in to view your favorite recipes.</h3>
        <div className="d-flex gap-3 mt-3">
          <Button className="login-ghost-button" onClick={() => navigate("/login")}>
            Log In
          </Button>
          <Button className="search-bar-button" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center favorites-page mt-5">
        <h4>You haven’t saved any recipes yet.</h4>
        <p>Start exploring and save your favorite ones!</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <Container className="recipe-results mt-4">
        <h3 className="text-dark text-center mb-4">💛 Your Favorite Recipes</h3>
        <Row className="g-4">
          {favorites.map((recipe) => (
            <Col key={recipe.id} xs={12} sm={6} md={6} lg={6}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Favorites;
