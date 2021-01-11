import { convertFromRaw, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getDocumentById } from '../../services/document.service';

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
  const { isLoading, isError, data = {}, error } = useQuery(['document:getById', id], getDocumentById);
  const { title, body, username, createdAt } = data;
  const [editorState, setEditorState] = useState(body);
  useEffect(() => {

    const state: any = body
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(body)))
      : EditorState.createEmpty();
    setEditorState(state);
  }, [body]); // add 'value' to the dependency list to recalculate state when value changes.

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  if (isLoading) {
    return <span>Chargement ...</span>;
  }

  return (
    <>
      <Row>
        <Col lg="8" className="mb-3">
          <div className="card p-3">
            <Tabs defaultActiveKey="Document" id="uncontrolled-tab">
              <Tab eventKey="Document" title="Document" className="mt-5">
                <Editor
                  toolbar={{ options: EDITOR_OPTIONS, }}
                  editorState={editorState}
                  onEditorStateChange={setEditorState} />
              </Tab>
              <Tab eventKey="PR" title="Comparer" className="mt-5"></Tab>
            </Tabs>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EditDocumentPage;
