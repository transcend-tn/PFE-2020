import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';

export interface EditProfileFormInterface {
  formik: any;
  isLoading: boolean;
}

function EditProfileForm(props: EditProfileFormInterface) {
  const { formik, isLoading } = props;

  return (
    <form onSubmit={formik.handleSubmit} className="mt-5">
      <Form.Group controlId="formBasicFname">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          name="fname"
          type="text"
          placeholder="Veuillez entrer votre prénom"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fname}
        />
        {formik.touched.fname && formik.errors.fname ? (
          <Form.Text className="text-danger">{formik.errors.fname}</Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group controlId="formBasicLname">
        <Form.Label>Prénom</Form.Label>
        <Form.Control
          name="lname"
          type="text"
          placeholder="Veuillez entrer votre nom de famille"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lname}
        />
        {formik.touched.lname && formik.errors.lname ? (
          <Form.Text className="text-danger">{formik.errors.lname}</Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>E-mail</Form.Label>
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
      <Button variant="primary" type="submit" className="btn-sm" disabled={isLoading}>
        Enregistrer les modifications
      </Button>
    </form>
  );
}

export default EditProfileForm;
