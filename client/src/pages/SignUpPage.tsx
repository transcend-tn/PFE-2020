import React from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { useStoreActions } from "../hooks/store.hooks";
import { SignUpPayload } from "../interfaces/signup.interface";

function SignUpPage() {
  const history = useHistory();
  const signUp = useStoreActions((actions) => actions.user.signUp);

  const formik = useFormik({
    initialValues: {
      username: "johndo",
      email: "johndoe@localhost.com",
      password: "mm",
      confirmPassword: "mm",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("This field is required !"),
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required !"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: (values: SignUpPayload) => {
      signUp(values).then(
        () => {history.push('signin')},
        () => {console.log("error !!!");}
      );
    },
  });

  return (
    <Card bg="light" text="dark" className="w-50">
      <Card.Body>
        <h2 className="text-center">Sign Up</h2>
        <hr />
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
              <Form.Text className="text-danger">
                {formik.errors.username}
              </Form.Text>
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
              <Form.Text className="text-danger">
                {formik.errors.email}
              </Form.Text>
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
              <Form.Text className="text-danger">
                {formik.errors.password}
              </Form.Text>
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
              <Form.Text className="text-danger">
                {formik.errors.confirmPassword}
              </Form.Text>
            ) : null}
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Link to="signin">You already have an account ?</Link>
            <Button variant="primary" type="submit" className="float-right">
              Submit
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default SignUpPage;