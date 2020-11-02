import React from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import DocumentHeader from '../../components/DocumentHeader';
import HistoryList from '../../components/HistoryList';
import PropositionList from '../../components/PropositionList';
import TeamMembersList from '../../components/TeamMembersList';
import { getDocumentById } from '../../services/document.service';
import MessageFormContainer from './containers/MessageFormContainer';
import MessageListContainer from './containers/MessageListContainer';

function DocumentPage() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, isError, data = {}, error } = useQuery([id], getDocumentById);


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
                <DocumentHeader title={data.title} createdAt={data.createdAt} docId={id} />
                <p className="mt-5">{data.body}</p>
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
          <TeamMembersList />
        </Col>
      </Row>
    </>
  );
}

export default DocumentPage;
