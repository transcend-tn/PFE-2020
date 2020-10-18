import React from "react";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";

const withMain = <P extends object>(Component: React.ComponentType) => {
  return (props: P) => (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Link to="/">
          <Navbar.Brand>Brand</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto mr-5">
            <Link to="new-document">
              <Nav.Item className="nav-link" >
                <VscNewFile color="#ffffff" size={30}/>
              </Nav.Item>
            </Link>
            <Link to="requests">
              <Nav.Item className="nav-link" >
                Mes Demandes
              </Nav.Item>
            </Link>
            <Link to="favoris">
              <Nav.Item className="nav-link" >
                Mes Favoris
              </Nav.Item>
            </Link>
            <Link to="documents">
              <Nav.Item className="nav-link" >
                Mes Documents
              </Nav.Item>
            </Link>
            <NavDropdown title="Username" id="collasible-nav-dropdown">
              <li className="dropdown-item" key="profile">
                <Link to="/">Profile</Link>
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
