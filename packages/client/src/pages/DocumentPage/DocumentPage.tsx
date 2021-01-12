import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import React from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import DocumentHeader from '../../components/DocumentHeader';
import HistoryList from '../../components/HistoryList';
import { getDocumentById } from '../../services/document.service';
import MessageFormContainer from './containers/MessageFormContainer';
import MessageListContainer from './containers/MessageListContainer';
import TeamMembersListContainer from './containers/TeamMembersListContainer';
import { format } from 'date-fns';
import PropositionListContainer from './containers/PropositionListContainer';

function DocumentPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data = {}, error } = useQuery(['document:getById', id], getDocumentById);
  const { title, body, username, createdAt } = data;
  // console.log(body);
  if (!body) return null;
  const contentState = convertFromRaw(body ? JSON.parse(body) : {});
// console.log(contentState)
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
                <DocumentHeader
                  title={title}
                  createdAt={format(new Date(createdAt), 'd/MM/yyyy, HH:mm')}
                  docId={id}
                  username={username}
                />
                <Editor editorState={EditorState.createWithContent(contentState)} readOnly={true} toolbarHidden/>
              </Tab>
              <Tab eventKey="PR" title="Propositions de Modifications" className="mt-5">
                <PropositionListContainer />
              </Tab>
              <Tab eventKey="Historique" title="Historique" className="mt-5">
                <HistoryList />
              </Tab>
            </Tabs>
          </div>
          <div className="bg-color-secondary card p-3 mt-5">
            <MessageFormContainer />
            <MessageListContainer />
          </div>
        </Col>

        <Col lg="4">
          <TeamMembersListContainer />
        </Col>
      </Row>
    </>
  );
}

export default DocumentPage;
