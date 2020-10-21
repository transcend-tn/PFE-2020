import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { MessageF } from '../interfaces/MessageForm';

function MessageForm() {
  const formik = useFormik({
    initialValues: {
      Texte: '',
    },
    validationSchema: Yup.object({
      Texte: Yup.string(),
    }),
    onSubmit: (values: MessageF) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Commenter
      </Button>
    </form>
  );
}

export default MessageForm;
