import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isHomePage = location.pathname === "/";

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      className={`navbar-custom ${isHomePage ? "navbar-transparent" : "navbar-black"}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white">
          Recipe Finder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left-aligned main nav */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-item">
              <span className={`nav-circle ${location.pathname === "/" ? "active-circle" : ""}`}></span>
              Search by ingredients
            </Nav.Link>
            <Nav.Link as={Link} to="/search" className="nav-item">
              <span className={`nav-circle ${location.pathname === "/search" ? "active-circle" : ""}`}></span>
              Get Inspired
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites" className="nav-item">
              <span className={`nav-circle ${location.pathname === "/favorites" ? "active-circle" : ""}`}></span>
              Favorites
            </Nav.Link>
          </Nav>

          {/* Right-aligned auth buttons */}
          <Nav className="auth-links">
            {user ? (
              <Nav.Link as="button" onClick={handleLogout} className="nav-auth-link logout-link">
                Log Out
              </Nav.Link>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className={`nav-auth-link ${location.pathname === "/login" ? "active-auth" : ""}`}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  className={`nav-auth-link ${location.pathname === "/signup" ? "active-auth" : ""}`}
                >
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
