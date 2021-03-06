import { UserLogin } from '@tr/common';
import { useFormik } from 'formik';
import jwt from 'jsonwebtoken';
import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import Form from 'react-bootstrap/esm/Form';
import { QueryStatus, useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useStoreActions } from '../hooks/store.hooks';
import { signInMutation } from '../services/user.service';

export interface SignInFormProps {
  handleShowModal: () => void;
}

function SignInForm(props: SignInFormProps) {
  const history = useHistory();
  const addToken = useStoreActions((actions) => actions.user.addToken);
  const addUser = useStoreActions((actions) => actions.user.addUser);
  const [signIn, { status }] = useMutation(signInMutation);
  const isLoading = QueryStatus.Loading === status;

  const formik = useFormik({
    initialValues: {
      username: 'johndoe',
      password: 'mm',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Veuillez saisir votre username !'),
      password: Yup.string().required('Veuillez saisir votre mot de passe !'),
    }),
    onSubmit: (values: UserLogin) => {
      signIn(values).then((values) => {
        if (values) {
          const user: any = jwt.decode(values.accessToken);
          addUser(user);
          addToken(values.accessToken);
          history.push(`/profile/${user.username}`);
        }
        /*           else
          toast.error('Connexion Echouée', {
            position: toast.POSITION.TOP_LEFT,
            className: "fade alert alert-danger show",
          }); */
      });
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
              <Button variant="success" type="button" onClick={props.handleShowModal} disabled={isLoading}>
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
