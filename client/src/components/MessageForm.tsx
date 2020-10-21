import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { MessageFormCreate } from '../interfaces/MessageForm';

function MessageForm() {
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: Yup.object({
      comment: Yup.string(),
    }),
    onSubmit: (values: MessageFormCreate) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control
          name="comment"
          as="textarea"
          rows={3}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Commenter
      </Button>
    </form>
  );
}

export default MessageForm;
