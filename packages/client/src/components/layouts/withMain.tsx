import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import { BiAddToQueue } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { RiHome2Line } from 'react-icons/ri';
import { queryCache } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { useStoreState } from '../../hooks/store.hooks';

const withMain = <P extends object>(Component: React.ComponentType) => {
  return (props: P) => {
    const user = useStoreState((state) => state.user.user);
    if (!user) return null;

    const history = useHistory();

    const onLogout = () => {
      localStorage.removeItem('accessToken');
      queryCache.invalidateQueries();
      history.push('/');
    };

    return (
      <>
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#2f2f2f' }} variant="dark">
          <Nav.Link as={Link} to={`/profile/${user.username}`}>
            <RiHome2Line className="mr-2" color="#ffffff" size={30} />
          </Nav.Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto mr-5">
              <Nav.Link as={Link} to="/document/new">
                <BiAddToQueue color="#ffffff" size={30} />
              </Nav.Link>
              <NavDropdown
                title={
                  <div className="btn-group">
                    <CgProfile color="#ffffff" size={30} />
                    <p className="nav-link mb-0" style={{ paddingTop: 3, paddingBottom: 0 }}>
                      {user.fname}
                      {'\xa0'}
                      {user.lname}
                    </p>
                  </div>
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to={`/profile/${user.username}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button variant="link" onClick={onLogout}>
                    Logout
                  </Button>
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
};

export default withMain;
