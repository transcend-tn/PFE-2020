import { convertFromRaw } from 'draft-js';
import React, { Component } from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Link } from 'react-router-dom';

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
        <div className="d-flex flex-row-reverse">
          <Link to="document">
            <Button className="mb-3" size="sm" variant="primary" onClick={this.onSubmitContent}>
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
                  onContentStateChange={this.onContentStateChange}
                />
              </Card>
            </Tab>
            <Tab eventKey="PR" title="Propositions de Modifications" className="mt-5">
              <Row>
                <Col lg="6" className="mb-3">
                  <div className="card p-3">OLD VERSION TEXT HERE</div>
                </Col>
                <Col lg="6">
                  <div className="card p-3 min">
                    {/* TODO: show all lines instead of only first line */}
                    {contentState.blocks ? contentState.blocks[0].text : ''}
                  </div>
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
