import React, { Component } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { Row, Col, Tabs, Tab, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/esm/Form';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

const content = {
  entityMap: {},
  blocks: [
    {
      key: '637gr',
      text: 'Initialized from content state.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

class EditDocumentPage extends Component {
  constructor(props: any) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    };
  }

  onContentStateChange = (contentState: any) => {
    this.setState({
      contentState,
    });
  };

  onSubmitContent = () => {
    const { contentState }: any = this.state;
    console.log('contentState: ', contentState);
  };

  render() {
    const { contentState }: any = this.state;
    return (
      <>
        <div className="card p-3">
          <div className="d-flex flex-row-reverse">
            <Link to="">
              <Button variant="primary" type="submit">
                Proposer une modification
              </Button>
            </Link>
          </div>
          <Tabs defaultActiveKey="edition" id="uncontrolled-tab">
            <Tab eventKey="edition" title="Edition" className="mt-5">
              <Form as={Row}>
                <Form.Label column="lg" sm="1" className="ml-3">
                  Titre
                </Form.Label>
                <Col sm="5">
                  <Form.Control type="text" />
                </Col>
              </Form>
              <Card>
                <Editor
                  wrapperClassName="m-4"
                  editorClassName="ml-4 mb-4"
                  toolbar={{
                    options: EDITOR_OPTIONS,
                  }}
                  onContentStateChange={this.onContentStateChange}
                />
              </Card>
            </Tab>
            <Tab eventKey="comparer" title="Comparer" className="mt-5">
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control name="texte" as="textarea" rows={3} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control name="texte" as="textarea" rows={3} />
                  </Form.Group>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </div>
      </>
    );
  }
}

export default EditDocumentPage;
