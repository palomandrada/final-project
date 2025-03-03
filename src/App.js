import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SearchResults from "./pages/SearchResults";
import { fetchRecipes } from "./api/recipes";
import "./styles.css";

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    const formattedQuery = query.replace(/\s+/g, ""); // Remove spaces
    const fetchedRecipes = await fetchRecipes(formattedQuery);

    navigate("/search", { state: { recipes: fetchedRecipes } });
  };

  return (
    <div className="app-container">
      <NavigationBar />
      <div className="search-container">
        <h1 className="text-white">Find Your Perfect Recipe</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
};

export default App;
