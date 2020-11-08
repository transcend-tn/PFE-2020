import { format } from 'date-fns';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import React from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import DocumentHeader from '../../components/DocumentHeader';
import HistoryList from '../../components/HistoryList';
import PropositionList from '../../components/PropositionList';
import { getDocumentById } from '../../services/document.service';
import MessageFormContainer from './containers/MessageFormContainer';
import MessageListContainer from './containers/MessageListContainer';
import TeamMembersListContainer from './containers/TeamMembersListContainer';

function DocumentPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data = {}, error } = useQuery(['document:getById', id], getDocumentById);
  const { title, body, owner, createdAt } = data;

  if (!body) return null;
  const contentState = convertFromRaw(body ? JSON.parse(body) : {});

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
                <DocumentHeader title={title} createdAt={format(new Date(createdAt), 'd/MM/yyyy, HH:mm')} docId={id} />
                <Editor editorState={EditorState.createWithContent(contentState)} onChange={() => {}} />
              </Tab>
              <Tab eventKey="PR" title="Propositions de Modifications" className="mt-5">
                <PropositionList />
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
