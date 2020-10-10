import React from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("This field is required !"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Card bg="light" text="dark" className="w-50">
      <Card.Body>
        <h2 className="text-center">Sign In</h2>
        <hr />
        <form onSubmit={formik.handleSubmit}>
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
          <div className="d-flex justify-content-between">
            <Link to="signup">Create an account</Link>
            <Button variant="primary" type="submit" className="float-right">
              Submit
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default SignIn;
