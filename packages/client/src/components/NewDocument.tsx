import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import Form from 'react-bootstrap/esm/Form';
import { Editor, EditorState } from 'react-draft-wysiwyg';

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
  formik: any;
  isLoading: boolean;
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

const NewDocument = (props: NewDocumentInterface) => {
  const { formik, isLoading, editorState, onEditorStateChange } = props;

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
            {isLoading ? 'Loading...' : 'Enregistrer'}
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

export default NewDocument;
