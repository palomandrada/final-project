import React from "react";
import { Form, Accordion } from "react-bootstrap";
import "../styles.css";

const Filters = ({ onFilterChange, filters, hasSearched }) => {
  if (!hasSearched) return null;

  const filterCategories = {
    "Dish Type": ["beverage", "dinner", "dessert", "lunch", "main course", "main dish", "side dish"].sort(),
    "Allergens & Restrictions": ["dairy free", "gluten free", "lacto ovo vegetarian", "pescatarian", "vegan"].sort(),
    "Diet": ["fodmap friendly", "ketogenic", "paleolithic", "primal", "southern", "whole 30"].sort(),
  };

  return (
    <div className="filters-container">
      <Accordion defaultActiveKey="0">
        {Object.entries(filterCategories).map(([category, tags], index) => (
          <Accordion.Item eventKey={String(index)} key={category} className="filter-card">
            <Accordion.Header className="filter-header">{category}</Accordion.Header>
            <Accordion.Body>
              {tags.map((tag) => (
                <Form.Check
                  key={tag}
                  type="checkbox"
                  label={tag}
                  checked={filters.includes(tag)}
                  onChange={() => onFilterChange(tag)}
                  className="filter-checkbox custom-checkbox"
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Filters;


