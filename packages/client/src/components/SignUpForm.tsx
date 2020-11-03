import { UserCreate } from '@tr/common';
import { useFormik } from 'formik';
import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/esm/Form';
import { QueryStatus, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { signUpMutation } from '../services/user.service';

function SignUpForm() {
  const history = useHistory();
  const [signUp, { status }] = useMutation(signUpMutation);
  const isLoading = QueryStatus.Loading === status;

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(15, 'Must be 15 characters or less')
        .required('This field is required !'),
      email: Yup.string().email('Invalid email address').required('This field is required !'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
    onSubmit: (values: UserCreate) => {
      signUp(values).then(
        (values) => {
          history.push('/');
        },
        (error) => {
          console.log('error !!!');
        },
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="Enter Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <Form.Text className="text-danger">{formik.errors.username}</Form.Text>
        ) : null}
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
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

      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          name="confirmPassword"
          type="password"
          placeholder="Confirm assword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <Form.Text className="text-danger">{formik.errors.confirmPassword}</Form.Text>
        ) : null}
      </Form.Group>
      <div className="text-center mt-3">
        <Button variant="success" type="submit" disabled={isLoading}>
          Confirmer
        </Button>
      </div>
    </form>
  );
}

export default SignUpForm;
