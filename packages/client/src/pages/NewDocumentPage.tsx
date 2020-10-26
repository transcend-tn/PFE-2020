import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import { Editor } from 'react-draft-wysiwyg';
import { QueryStatus, useMutation } from 'react-query';
import { documentCreateMutation } from '../services/document.service';

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

const NewDocumentPage = () => {
  const [mutate] = useMutation(documentCreateMutation);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    console.log('editorState: ', draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return setEditorState(editorState);
  };

  const onSubmitContent = () => {
    console.log(editorState);
    mutate({
      body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      title: 'title',
    });
  };

  return (
    <Card>
      <div className="m-4">
        <Button variant="primary" onClick={onSubmitContent}>
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
          {QueryStatus.Loading !== 'loading' ? 'Loading...' : 'Enregistrer'}
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
  );
};

export default NewDocumentPage;
