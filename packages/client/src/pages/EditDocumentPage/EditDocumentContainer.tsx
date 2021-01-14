import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { getDocumentById } from '../../services/document.service';
import { createRequestMutation } from '../../services/request.service';

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

const EditDocumentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [requestUpdateDocument, { status }] = useMutation(createRequestMutation);
  const { isLoading, isError, data = {}, error } = useQuery(['document:getById', id], getDocumentById);
  const { title, body, username, createdAt } = data;
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
      const payload = {
        id: id,
        body: {
          title: values.title,
          body: JSON.stringify(body),
        },
      };
      requestUpdateDocument(payload).then(
        () => {
          values.title = '';
          // setEditorState(EditorState.createEmpty());

          toast.success('PR Créé', {
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

  const Diff = require('diff');
  const oldBody = body ? convertFromRaw(JSON.parse(body)).getPlainText() : '';
  const newBody = editorState ? editorState.getCurrentContent().getPlainText() : '';
  let span = null;
  let display = document.createElement('span');
  const diff = Diff.diffChars(oldBody, newBody);

  diff.forEach((part: any) => {
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
    const backgroundColor = part.added ? '#d1e7dd' : part.removed ? '#f8d7da' : ''; //#e2e3e5
    span = document.createElement('span');
    span.style.color = color;
    span.style.backgroundColor = backgroundColor;
    span.appendChild(document.createTextNode(part.value));
    display.appendChild(span);
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
              placeholder="PR Title"
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
          <Col lg="8" className="mb-3">
            <div className="card p-3">
              <Tabs defaultActiveKey="Document" id="uncontrolled-tab">
                <Tab eventKey="Document" title="Document" className="mt-5">
                  <Editor
                    toolbar={{ options: EDITOR_OPTIONS }}
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                  />
                </Tab>
                <Tab eventKey="PR" title="Comparer" className="mt-5">
                  <div className="card-deck mb-3 text-center">
                    <div className="card  box-shadow">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-light" style={{ fontSize: 'small' }}>
                          Old Version
                        </h4>
                      </div>
                      <div className="card-body">
                        {/* <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(body)))} readOnly={true} toolbarHidden /> */}
                        <div
                          className="text-left"
                          dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(body)) }}
                        />
                      </div>
                    </div>
                    <div className="card  box-shadow">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-light" style={{ fontSize: 'small' }}>
                          New Version
                        </h4>
                      </div>
                      <div className="card-body">
                        {/* <Editor editorState={editorState} toolbarHidden readOnly/> */}
                        <div
                          className="text-left"
                          dangerouslySetInnerHTML={{
                            __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
          <Col lg="4" className="mb-3">
            <h4>Watch changes</h4>
            <div className="bg-white p-4 text-left" dangerouslySetInnerHTML={{ __html: display.innerHTML }} />
          </Col>
        </Row>
      </form>
    </>
  );
};

export default EditDocumentPage;
