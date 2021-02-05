import * as Diff2Html from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { DOCUMENT_BY_ID } from '../../constants/uris';
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
  const [requestUpdateDocument] = useMutation(createRequestMutation);
  const { isLoading, isError, data = {}, error } = useQuery(['document:getById', id], getDocumentById);
  const { title, body } = data;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  let history = useHistory();
  useEffect(() => {
    const state: any = body
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(body)))
      : EditorState.createEmpty();
    setEditorState(state);
  }, [body]);

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
          toast.success(`${values.title} created`, {
            position: toast.POSITION.TOP_RIGHT,
            className: 'fade alert alert-success show',
          });
          values.title = '';
          history.push(DOCUMENT_BY_ID(id) + '?tab=PR');
        },
        (error) => {
          console.log({ error });
        },
      );
    },
  });
  ///////// use Difff & Diff2Html //////////
  const Diff = require('diff');
  const oldBody = body ? convertFromRaw(JSON.parse(body)).getPlainText() : '';
  const newBody = editorState ? editorState.getCurrentContent().getPlainText() : '';
  const input = Diff.createPatch(title, oldBody, newBody);
  let outputHtml = Diff2Html.html(input, {
    drawFileList: false,
    matching: 'lines',
    outputFormat: 'side-by-side',
  });
  //////////////////////////////////////////

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
          <Col lg="12" className="mb-3">
            <div className="card p-3">
              <Tabs defaultActiveKey="Document" id="uncontrolled-tab">
                <Tab eventKey="Document" title="Document" className="mt-5">
                  <Editor
                    toolbar={{ options: EDITOR_OPTIONS }}
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                  />
                </Tab>
                <Tab eventKey="Comparer" title="Comparer" className="mt-5">
                  <div className="p-4" dangerouslySetInnerHTML={{ __html: outputHtml }} />
                </Tab>
                <Tab eventKey="Preview" title="Preview" className="mt-5">
                  <div className="card-deck mb-3 text-center">
                    <div className="card  box-shadow">
                      <div className="card-header">
                        <h4 className="my-0 font-weight-light" style={{ fontSize: 'small' }}>
                          Old Version
                        </h4>
                      </div>
                      <div className="card-body">
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
        </Row>
      </form>
    </>
  );
};

export default EditDocumentPage;
