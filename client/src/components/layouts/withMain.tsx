import React from 'react';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import Container from 'react-bootstrap/esm/Container';
import { BiAddToQueue } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { RiHome2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const withMain = <P extends object>(Component: React.ComponentType) => {
  return (props: P) => (
    <>
      <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#2f2f2f' }} variant="dark">
        <Link to="/">
          <RiHome2Line color="#ffffff" size={30} />
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto mr-5">
            <Nav.Link as={Link} to="new-document">
              <BiAddToQueue color="#ffffff" size={30} />
            </Nav.Link>
            <Nav.Link as={Link} to="requests">
              Collaborations
            </Nav.Link>
            <Nav.Link as={Link} to="favoris">
              Mes Favoris
            </Nav.Link>
            <Nav.Link as={Link} to="documents">
              Mes Documents
            </Nav.Link>
            <NavDropdown title={<CgProfile color="#ffffff" size={20} />} id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="#">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/">
                Logout
              </NavDropdown.Item>
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
