import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import * as Yup from 'yup';
import { CommentCreate } from '@tr/common';

export interface MessageFormInterface {
  createComment?: any;
  isLoading?: boolean;
  docId?: string;
  reqId?: string;
}

function MessageForm(props: MessageFormInterface) {
  const { createComment, isLoading, reqId } = props;

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string(),
    }),

    onSubmit: async (payload: CommentCreate, { setSubmitting, setErrors, setStatus, resetForm }) => {
      try {
        createComment({ reqId, payload });
        resetForm({});
        setStatus({ success: true });
      } catch (error) {
        setStatus({ success: false });
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="Form.CreateMessage">
        <Form.Control
          name="body"
          as="textarea"
          rows={1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          style={{ height: '100px', resize: 'none' }}
        />
      </Form.Group>
      <div className="text-right mb-3">
        <Button variant="success" size="sm" type="submit" disabled={isLoading}>
          Commenter
        </Button>
      </div>
    </form>
  );
}

export default MessageForm;
