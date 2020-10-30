import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { Editor } from 'react-draft-wysiwyg';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getDocumentById } from '../../services/document.service';
import * as Yup from 'yup';

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
  const [contentState, setContent] = useState('');
  const { id } = useParams<{ id: string }>();

  const { isLoading, isError, data = {}, error } = useQuery([id], getDocumentById);

  const formik = useFormik({
    initialValues: {
      description: '',
    },
    validationSchema: Yup.object({
      description: Yup.string(),
    }),
    onSubmit: () => {
      console.log(formik.values.description);
    },
  });

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  if (isLoading) {
    return <span>Chargement ...</span>;
  }

  const onContentStateChange = (contentState: any) => {
    setContent(contentState);
  };

  const onSubmitContent = () => {
    console.log('contentState: ', contentState);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>{data.title}</h4>
        <Link to="document">
          <Button className="mb-3" size="sm" variant="primary" onClick={onSubmitContent}>
            Proposer Modification
          </Button>
        </Link>
      </div>
      <div className="card p-3 min">
        <Tabs defaultActiveKey="Document" id="uncontrolled-tab">
          <Tab eventKey="Document" title="Document" className="mt-5">
            <Card className="card-header p-2 bg-white">
              <Editor
                wrapperClassName="m-4"
                editorClassName="ml-4 mb-4"
                toolbar={{
                  options: EDITOR_OPTIONS,
                }}
                onContentStateChange={onContentStateChange}
              />
            </Card>
          </Tab>
          <Tab eventKey="PR" title="Propositions de Modifications" className="mt-5">
            <form onSubmit={formik.handleSubmit} className="mt-5">
              <Form.Group controlId="description">
                <Form.Control
                  name="description"
                  type="text"
                  placeholder="Enter votre description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                <Row>
                  <Col lg="6" className="mb-3">
                    <div className="card p-3">OLD VERSION TEXT HERE</div>
                  </Col>
                  <Col lg="6">
                    <div className="card p-3 min">
                      {/* TODO: show all lines instead of only first line */}
                      bla bla bla
                    </div>
                  </Col>
                </Row>
              </Form.Group>
            </form>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default EditDocumentPage;
