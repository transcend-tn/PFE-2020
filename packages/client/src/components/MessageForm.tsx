import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import * as Yup from 'yup';
import { CommentCreate } from '@tr/common';

function MessageForm() {
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: Yup.object({
      comment: Yup.string(),
    }),
    onSubmit: (values: CommentCreate) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control
          name="comment"
          as="textarea"
          rows={1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
          style={{ height: '100px', resize: 'none' }}
        />
      </Form.Group>
      <div className="text-right mb-3">
        <Button variant="success" size="sm" type="submit">
          Commenter
        </Button>
      </div>
    </form>
  );
}

export default MessageForm;
