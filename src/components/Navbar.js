import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <Navbar expand="lg" className={`navbar-custom ${isHomePage ? "navbar-transparent" : "navbar-black"}`}>
      <Container>
        <Navbar.Brand href="/" className="text-white">Recipe Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/search" className="text-white">Search</Nav.Link>
            <Nav.Link href="/favorites" className="text-white">Favorites</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

