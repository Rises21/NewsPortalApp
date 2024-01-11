import { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useFetch from "../api/customHooks/useFetch";

function NavigationBar({ isLogin, setRefreshToken, handleLogout }) {
  const { userAuth, token, expire } = useFetch("http://localhost:3002/token");
  const activeNav = function ({ isActive, isPending }) {
    return isPending ? "pending" : isActive ? "active" : "";
  };

  useEffect(() => {
    setRefreshToken(token);
  }, [token]);

  return (
    <Navbar expand="lg" className="rgb-background">
      <Container fluid>
        <Navbar expand="md" className="w-100 mx-sm-4">
          <Navbar.Brand>
            <NavLink>
              <h3 className="text-light">Today News</h3>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="news-navbar-nav"
            className="position-relative top-0 end-0 m-2"
          />

          <Navbar.Collapse
            id="news-navbar-nav"
            className="justify-content-end align-items-end"
          >
            <Nav className="customNavLink w-30 align-items-start column-gap-4">
              <NavLink to="/" className={activeNav}>
                Home
              </NavLink>
              <NavLink to="saved-news" className={activeNav}>
                Saved News
              </NavLink>

              {isLogin ? (
                <NavLink
                  onClick={handleLogout}
                  to="login"
                  className={activeNav}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink to="login" className={activeNav}>
                  Login
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
