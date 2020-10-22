import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { EditProf } from '../interfaces/EditProfileForm.interface';

function EditProfileForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      familyname: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('name is required !'),
      familyname: Yup.string().required('first name  is required !!'),
      email: Yup.string().email('Invalid email address').required('This field is required !'),
    }),
    onSubmit: (values: EditProf) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-5">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <Form.Text className="text-danger">{formik.errors.name}</Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            name="familyname"
            type="text"
            placeholder="Enter familyname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.familyname}
          />
          {formik.touched.familyname && formik.errors.familyname ? (
            <Form.Text className="text-danger">{formik.errors.familyname}</Form.Text>
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
      <Button variant="primary" type="submit" className="btn-sm">
        Enregistrer les modifications
      </Button>
    </form>
  );
}

export default EditProfileForm;
