import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css"; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <Form className="d-flex flex-column align-items-center w-100" onSubmit={handleSearch}>
      <div className="d-flex flex-column align-items-center w-50 search-bar">
        <FormControl
          type="text"
          placeholder="What ingredients do you have?"
          className="form-control form-control-lg text-center" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="dark" type="submit" className="btn-lg mt-3">
          Search Recipe <FontAwesomeIcon icon={faCarrot} className="ms-2" />
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;
