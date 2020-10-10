import React from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 bg-midnight">
      <Card bg="light" text="dark" className="w-50">
        <Card.Body>
          <h2 className="text-center">Sign Up</h2>
          <hr/>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm assword" />
              <Form.Text className="text-danger">
                Check you password !
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-between">
            <Link to="signin">You already have an account ?</Link>
            <Button variant="primary" type="submit" className="float-right">
              Submit
            </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignUp;
