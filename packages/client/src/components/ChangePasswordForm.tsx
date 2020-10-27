import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';

export interface ChangePasswordFormInterface {
  formik: any;
}

function ChangePasswordForm(props: ChangePasswordFormInterface) {
  const { formik } = props;

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

      <Button variant="primary" type="submit">
        Enregistrer les modifications
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
