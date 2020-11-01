import { UserChangePassword } from '@tr/common';
import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import * as Yup from 'yup';

export interface ChangePasswordFormInterface {
  editPassword: any;
  isLoading: boolean;
}

function ChangePasswordForm(props: ChangePasswordFormInterface) {
  const { editPassword, isLoading} = props;
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Veuillez saisir votre Mot de passe actuel'),

      newPassword: Yup.string().required('Veuillez saisir votre nouveau mot de passe'),
      confirmPassword: Yup.string()
        .required('Confirmer le mot de passe')
        .oneOf([Yup.ref('newPassword')], 'Le mot de passe doit correspondre'),
    }),
    onSubmit: (payload: UserChangePassword) => {
      editPassword(payload);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="mt-5">
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

      <Button variant="primary" type="submit" disabled={isLoading}>
        Enregistrer les modifications
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
