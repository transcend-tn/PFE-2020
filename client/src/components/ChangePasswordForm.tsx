import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ChangePassPayload } from '../interfaces/ChangePassword.interface';

function ChangePasswordForm() {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Old Password is required'),

      newPassword: Yup.string().required('New Password is required'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    }),
    onSubmit: (values: ChangePassPayload) => {
      console.log(values);
    },
  });

  return (
    <Card bg="#fff" text="dark" className="w-50">
      <Card.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicOldPassword">
            <Form.Label>Mot de passe actuel</Form.Label>
            <Form.Control
              name="oldPassword"
              type="password"
              placeholder="Mot de passe actuel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPassword}
            />
            {formik.touched.oldPassword && formik.errors.oldPassword ? (
              <Form.Text className="text-danger">{formik.errors.oldPassword}</Form.Text>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formBasicNewPassword">
            <Form.Label>Nouveau mot de passe</Form.Label>
            <Form.Control
              name="newPassword"
              type="password"
              placeholder="Nouveau mot de passe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <Form.Text className="text-danger">{formik.errors.newPassword}</Form.Text>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirmer mot de passe</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              placeholder="Confirmer mot de passe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <Form.Text className="text-danger">{formik.errors.confirmPassword}</Form.Text>
            ) : null}
          </Form.Group>

          <Button variant="primary" type="submit">
            Enregistrer les modifications
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
}

export default ChangePasswordForm;
