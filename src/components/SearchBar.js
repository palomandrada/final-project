import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen size to toggle `stacked` layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // ✅ Tablets & Mobile use stacked
    };

    handleResize(); // Call on mount
    window.addEventListener("resize", handleResize); // Listen for changes

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <Form 
      className={`search-bar ${isMobile ? "search-stacked" : "search-inline"}`} 
      onSubmit={handleSearch}
    >
      <FormControl
        type="text"
        placeholder="What ingredients do you have?"
        className="form-control form-control-lg text-center custom-search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="dark" type="submit" className="btn-lg search-button">
        Search Recipe <FontAwesomeIcon icon={faCarrot} className="ms-2" />
      </Button>
    </Form>
  );
};

export default SearchBar;

