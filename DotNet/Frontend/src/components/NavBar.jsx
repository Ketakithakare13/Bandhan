import React from "react";
import { Navbar as BootstrapNavbar, Container, Nav, Dropdown } from "react-bootstrap";
import "../../Styles/navbar.css";

function NavBar() {
  return (
    <BootstrapNavbar className="bg-body-tertiary sticky-top" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="/">
          <img
            alt="Bandhan Logo"
            src="/images/Bandhan.png"
            width="100"
            height="50"
            className="d-inline-block align-top"
          />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle as="a" className="nav-link text-decoration-none">
                <span className="bi bi-person"></span> Login
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/adminLogin">Admin</Dropdown.Item>
                <Dropdown.Item href="/login">User</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link href="/contactUs">
              <span className="bi bi-phone"></span> Contact Us
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default NavBar;
