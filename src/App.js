import React, { useState, useEffect } from "react";
import NavigationBar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import "./styles.css";

const backgroundImages = [
  "/img/background1.jpg",
  "/img/background2.jpg",
  "/img/background3.jpg",
];

const IMAGE_CHANGE_INTERVAL = 8000; // Change every 8 seconds
const FADE_OUT_DURATION = 2000; // Fade-out to black lasts 3 seconds
const BLACK_SCREEN_DURATION = 100; // Stay black for 0.1 seconds
const FADE_IN_DURATION = 2500; // Fade-in lasts 2.5 seconds

const App = () => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fade-out effect 

      setTimeout(() => {
        setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
        
        setTimeout(() => {
          setFade(false); // Start fade-in effect (after 0.5s black screen)
        }, BLACK_SCREEN_DURATION);
        
      }, FADE_OUT_DURATION); 

    }, IMAGE_CHANGE_INTERVAL); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      {/* Black fade-out overlay */}
      <div className={`fade-overlay ${fade ? "fade-to-black" : ""}`}></div>

      {/* Background image */}
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundImages[currentBackground]})` }}
      ></div>

      <NavigationBar />
      <div className="search-container">
        <h1 className="text-white">Find Your Perfect Recipe</h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default App;
