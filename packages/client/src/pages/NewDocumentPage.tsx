import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import Form from 'react-bootstrap/esm/Form';
import { Editor } from 'react-draft-wysiwyg';
import { QueryStatus, useMutation } from 'react-query';
import * as Yup from 'yup';
import { documentCreateMutation } from '../services/document.service';

const EDITOR_OPTIONS = [
  'history',
  'inline',
  'blockType',
  'fontSize',
  'colorPicker',
  'textAlign',
  'list',
  'link',
  'emoji',
];

const NewDocumentPage = () => {
  const [mutate, { status, data, error }] = useMutation(documentCreateMutation);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    return setEditorState(editorState);
  };

  const onSubmitContent = () => {
    if (formik.values.title !== '')
      mutate({
        body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        title: formik.values.title,
      });
    formik.values.title = '';
    setEditorState(EditorState.createEmpty());
  };

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: () => {
      console.log(formik.values.title);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-5">
      <Form.Group controlId="formBasicOldPassword">
        <Form.Control
          name="title"
          type="text"
          placeholder="Enter Document Title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <Form.Text className="text-danger">{formik.errors.title}</Form.Text>
        ) : null}
      </Form.Group>
      <Card>
        <div className="m-4">
          <Button variant="primary" onClick={onSubmitContent}>
            {QueryStatus.Loading === status && (
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            )}
            {QueryStatus.Loading === status ? 'Loading...' : 'Enregistrer'}
          </Button>
        </div>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="m-4"
          editorClassName="ml-4 mb-4"
          toolbar={{
            options: EDITOR_OPTIONS,
          }}
        />
      </Card>
    </form>
  );
};

export default NewDocumentPage;
