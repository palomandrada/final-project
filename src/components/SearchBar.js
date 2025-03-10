import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchBar = ({ onSearch, layout = "inline" }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <Form 
      className={`search-bar ${layout === "stacked" ? "search-stacked" : "search-inline"}`} 
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

