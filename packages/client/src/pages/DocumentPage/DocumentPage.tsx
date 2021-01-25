import { convertFromRaw, EditorState } from 'draft-js';
import React from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import DocumentHeader from '../../components/DocumentHeader';
import HistoryList from '../../components/HistoryList';
import { getDocumentById, getDocumentHistory } from '../../services/document.service';
import MessageFormContainer from './containers/MessageFormContainer';
import MessageListContainer from './containers/MessageListContainer';
import PropositionListContainer from './containers/PropositionListContainer';
import TeamMembersListContainer from './containers/TeamMembersListContainer';

function DocumentPage() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isError, data = {}, error } = useQuery(['document:getById', id], getDocumentById);
  const { title, body, username, owner, createdAt } = data;
  const {
    isLoading: history_isLoading,
    isError: history_isError,
    data: history_data = [],
    error: history_error,
  } = useQuery(['document:history', id], getDocumentHistory);
  let tab = new URLSearchParams(useLocation().search).get('tab');
  let validTab = false;
  if (tab) {
    validTab = ['document', 'PR', 'history'].includes(tab);
  }

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
            <Tabs defaultActiveKey={tab && validTab ? tab : 'document'} id="uncontrolled-tab">
              <Tab eventKey="document" title="Document" className="mt-5">
                <DocumentHeader title={title} createdAt={createdAt} docId={id} username={username} />
                <Editor editorState={EditorState.createWithContent(contentState)} readOnly={true} toolbarHidden />
              </Tab>
              <Tab eventKey="PR" title="Propositions de Modifications" className="mt-5">
                <PropositionListContainer owner={owner} />
              </Tab>
              <Tab eventKey="history" title="Historique" className="mt-5">
                <HistoryList data={history_data} />
              </Tab>
            </Tabs>
          </div>
          <div className="bg-color-secondary card p-3 mt-5">
            <MessageFormContainer />
            <MessageListContainer />
          </div>
        </Col>

        <Col lg="4">
          <TeamMembersListContainer owner={owner} />
        </Col>
      </Row>
    </>
  );
}

export default DocumentPage;
