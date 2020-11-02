import { EditorState } from 'draft-js';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import Form from 'react-bootstrap/esm/Form';
import { Editor } from 'react-draft-wysiwyg';
import { MutateFunction } from 'react-query';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useStoreState } from '../hooks/store.hooks';

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

export interface NewDocumentInterface {
  isLoading: boolean;
  createDocument: MutateFunction<string, unknown, any, unknown>;
}

const NewDocument = (props: NewDocumentInterface) => {
  const history = useHistory();
  const user = useStoreState((state) => state.user.user);
  const { isLoading, createDocument } = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: (values) => {
        createDocument({
          body: editorState.getCurrentContent(),
          title: values.title,
        }).then(
          ()=>{
            values.title = '';
            setEditorState(EditorState.createEmpty());
            history.push(`/profile/${user.username}`);
          },
          (error)=>{
            console.log({error})
          }
        );

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
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
            {isLoading ? 'Chargement...' : 'Enregistrer'}
          </Button>
        </div>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
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

export default NewDocument;
