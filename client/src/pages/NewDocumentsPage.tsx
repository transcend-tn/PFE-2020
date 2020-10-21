import { convertFromRaw } from 'draft-js';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Card from 'react-bootstrap/esm/Card';

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

  render() {
    const { contentState }: any = this.state;
    return (
      <div>
        <Card>
          <Editor
            wrapperClassName="mt-4 ml-4 mr-4 mb-4"
            editorClassName="ml-4 mb-4"
            editorStyle={{ maxHeight: '310px' }}
            toolbar={{
              options: [
                'history',
                'inline',
                'blockType',
                'fontSize',
                'colorPicker',
                'textAlign',
                'list',
                'link',
                'emoji',
              ],
            }}
            onContentStateChange={this.onContentStateChange}
          />
        </Card>
        <div className="d-flex flex-row-reverse" style={{ width: 'auto' }}>
          <Button
            className="d-flex flex-row-reverse mt-4"
            variant="secondary"
            onClick={() => console.log(contentState.blocks)}
          >
            Post
          </Button>
        </div>
      </div>
    );
  }
}
export default NewDocumentPage;
