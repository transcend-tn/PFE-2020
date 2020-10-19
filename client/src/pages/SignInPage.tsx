import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStoreActions } from '../hooks/store.hooks';
import { SignInPayload } from '../interfaces/signIn.interface';

function SignInPage() {
  const history = useHistory();
  const signIn = useStoreActions((actions) => actions.user.signIn);

  const formik = useFormik({
    initialValues: {
      username: 'johndoe',
      password: 'mm',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('This field is required !'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values: SignInPayload) => {
      signIn(values).then(
        () => {
          history.push('/');
        },
        () => {
          console.log('error !!!');
        },
      );
    },
  });

  return (
    <Card bg="#fff" text="dark" className="w-50" style={{ maxWidth: '30rem' }}>
      <Card.Body>
        <h2 className="text-center">Sign In</h2>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <Form.Text className="text-danger">{formik.errors.username}</Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <Form.Text className="text-danger">{formik.errors.password}</Form.Text>
            ) : null}
          </Form.Group>
          <div className="d-flex justify-content-between">
            <span>
              <Link to="signup">Create an account</Link>
              <br />
              <Link to="forget-password">Mot de passe oublié ?</Link>
            </span>
            <Button variant="primary" type="submit" className="float-right">
              Submit
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default SignInPage;
