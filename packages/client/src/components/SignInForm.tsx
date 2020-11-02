import { UserLogin } from '@tr/common';
import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import Form from 'react-bootstrap/esm/Form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useStoreActions, useStoreState } from '../hooks/store.hooks';

export interface SignInFormProps {
  handleShowModal: () => void;
}

function SignInForm(props: SignInFormProps) {
  const history = useHistory();
  const signIn = useStoreActions((actions) => actions.user.signIn);
  const user = useStoreState((state) => state.user.user);

  const formik = useFormik({
    initialValues: {
      username: 'johndoe',
      password: 'mm',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('This field is required !'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values: UserLogin) => {
      signIn(values).then(
        (values) => {
          if (user) {
            history.push(`/profile/${user.username}`);
          }
        },
        (error) => {
          toast.error('Error Notification !', {
            position: toast.POSITION.TOP_LEFT,
          });
        },
      );
    },
  });

  return (
    <Card bg="#fff" text="dark" className="shadow">
      <Card.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicUsername">
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
          <div>
            <Button variant="primary" type="submit" size="lg" block>
              Connexion
            </Button>
            <div className="text-center mt-3">
              <Link to="forget-password">Mot de passe oublié ?</Link>
            </div>
            <hr />
            <div className="text-center">
              <Button variant="success" type="button" onClick={props.handleShowModal}>
                Inscription
              </Button>
            </div>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default SignInForm;
