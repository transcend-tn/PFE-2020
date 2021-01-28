import React from 'react';
import { Button, FormControl } from 'react-bootstrap';
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
import Form from 'react-bootstrap/esm/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SEARCH } from '../../constants/uris';

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

    const formik = useFormik({
      initialValues: {
        search: '',
      },
      validationSchema: Yup.object({
        search: Yup.string().required(' '),
      }),
      onSubmit: (values) => {
        history.push(SEARCH(values.search));
      },
    });

    return (
      <>
        <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#2f2f2f' }} variant="dark">
          <Nav.Link as={Link} to={`/profile/${user.username}`}>
            <RiHome2Line className="mr-2" color="#ffffff" size={30} />
          </Nav.Link>

          <form onSubmit={formik.handleSubmit} className="form-inline">
            <Form.Group controlId="search">
              <Form.Control
                name="search"
                type="text"
                placeholder="Search"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.search}
              />
              {formik.touched.search && formik.errors.search ? (
                <Form.Text className="text-danger">{formik.errors.search}</Form.Text>
              ) : null}
            </Form.Group>
          </form>

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
