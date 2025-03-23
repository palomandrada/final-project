import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SearchResults from "./pages/SearchResults"; 
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { fetchRecipes } from "./api/recipes";
import "./styles.css";

const backgroundImages = [
  "/img/background1.jpg",
  "/img/background2.jpg",
  "/img/background3.jpg",
  "/img/background4.jpg",
  "/img/background5.jpg",
  "/img/background6.jpg",
];

const App = () => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
        setTimeout(() => {
          setFade(false);
        }, 100);
      }, 2000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    try {
      const fetchedRecipes = await fetchRecipes(query);
      navigate("/search", { 
        state: { 
          recipes: fetchedRecipes, 
          fromSearch: true, 
          searchQuery: query 
        } 
      });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="app-container">
      <div className={`fade-overlay ${fade ? "fade-to-black" : ""}`}></div>
      <div className="background" style={{ backgroundImage: `url(${backgroundImages[currentBackground]})` }}></div>
      <NavigationBar />

      {location.pathname === "/" && (
        <div className="search-container">
          <h1 className="text-white">Find Your Perfect Recipe</h1>
          <SearchBar onSearch={handleSearch} layout="stacked" />
        </div>
      )}

      <Routes>
        <Route path="/" element={<div />} /> {/* Home Page */}
        <Route path="/search" element={<SearchResults />} /> 
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
