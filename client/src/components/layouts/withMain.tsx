import React from "react";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import { GrAdd } from "react-icons/gr";

const withMain = <P extends object>(Component: React.ComponentType) => {
  return (props: P) => (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home">Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto mr-5">
            <Link to="profile">
              <Nav.Item className="nav-link" >
                <GrAdd />
              </Nav.Item>
            </Link>
            <NavDropdown title="Username" id="collasible-nav-dropdown">
              <li className="dropdown-item" key="profile">
                <Link to="profile">Profile</Link>
              </li>
              <NavDropdown.Divider />
              <li className="dropdown-item" key="logout">
                <Link to="signup">Logout</Link>
              </li>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="h-100 mt-5">
        <Component {...props} />
      </Container>
    </>
  );
};

export default withMain;
