import { convertFromRaw } from 'draft-js';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Card from 'react-bootstrap/esm/Card';

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

class NewDocumentPage extends Component {
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
    return (
      <Card>
        <div className="m-4">
          <Button variant="primary" onClick={this.onSubmitContent}>
            Enregistrer
          </Button>
        </div>
        <Editor
          wrapperClassName="m-4"
          editorClassName="ml-4 mb-4"
          toolbar={{
            options: EDITOR_OPTIONS,
          }}
          onContentStateChange={this.onContentStateChange}
        />
      </Card>
    );
  }
}
export default NewDocumentPage;
