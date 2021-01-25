import 'diff2html/bundles/css/diff2html.min.css';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { createDocumentMutation, getDocumentSnapshot } from '../../services/document.service';

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

const CloneDocumentPage = () => {
  const { docId, histId } = useParams<{ docId: string; histId: string }>();
  const [createDocument, { status }] = useMutation(createDocumentMutation);
  const { isLoading, isError, data = {}, error } = useQuery(
    ['document:getSnapshot', { docId, histId }],
    getDocumentSnapshot,
  );
  const body = data.body;
  const [editorState, setEditorState] = useState(body);
  useEffect(() => {
    const state: any = body
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(body)))
      : EditorState.createEmpty();
    setEditorState(state);
  }, [body]); // add 'value' to the dependency list to recalculate state when value changes.

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: (values) => {
      const content = editorState.getCurrentContent();
      const body = convertToRaw(content);
      createDocument({
        body: JSON.stringify(body),
        title: values.title,
      }).then(
        () => {
          values.title = '';
          setEditorState(EditorState.createEmpty());

          toast.success('Document Créé', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'fade alert alert-success show',
          });
        },
        (error) => {
          console.log({ error });
        },
      );
    },
  });

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  if (isLoading) {
    return <span>Chargement ...</span>;
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mt-5">
        <div className="input-group mb-4">
          <Form.Group controlId="titleControl">
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
          <div className="ml-2">
            <Button variant="btn btn-outline-secondary" type="submit" disabled={isLoading}>
              {isLoading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
              {isLoading ? 'Chargement...' : 'Enregistrer'}
            </Button>
          </div>
        </div>
        <Row>
          <Col lg="12" className="mb-3">
            <div className="card p-3">
              <Editor
                toolbar={{ options: EDITOR_OPTIONS }}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                readOnly={true}
                toolbarHidden
              />
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default CloneDocumentPage;
