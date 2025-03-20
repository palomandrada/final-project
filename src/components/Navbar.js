import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <Navbar expand="lg" className={`navbar-custom ${isHomePage ? "navbar-transparent" : "navbar-black"}`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white">Recipe Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="nav-item"
            >
              <span className={`nav-circle ${location.pathname === "/" ? "active-circle" : ""}`}></span>
              Search by ingredients
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/search"
              className="nav-item"
            >
              <span className={`nav-circle ${location.pathname === "/search" ? "active-circle" : ""}`}></span>
              Get Inspired
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favorites"
              className="nav-item"
            >
              <span className={`nav-circle ${location.pathname === "/favorites" ? "active-circle" : ""}`}></span>
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
