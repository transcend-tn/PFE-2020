import React from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import DocumentHeader from '../components/DocumentHeader';
import HistoryList from '../components/HistoryList';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import PropositionList from '../components/PropositionList';
import TeamMembersList from '../components/TeamMembersList';

const doc = {
  title: 'document-01',
  createdAt: '01/10/2020',
  body:
    'Id duis reprehenderit nostrud sint ea nostrud fugiat aliqua exercitation nostrud nostrud ad do mollit. Dolor reprehenderit culpa pariatur duis aute duis ut dolore. Minim officia do Lorem sunt sit nulla Lorem. Ut non velit irure nisi sit Lorem cillum nisi laboris labore qui est minim ad. Amet do officia officia amet voluptate ex voluptate cupidatat reprehenderit ullamco ad cillum consectetur. Consequat deserunt id eu adipisicing irure dolore deserunt eu duis tempor ut adipisicing. Aliquip et est quis ut consectetur qui Lorem ullamco aliqua id enim cillum.',
};

function DocumentPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Row>
        <Col lg="8" className="mb-3">
          <div className="card p-3">
            <Tabs defaultActiveKey="Document" id="uncontrolled-tab">
              <Tab eventKey="Document" title="Document" className="mt-5">
                <DocumentHeader title={doc.title} createdAt={doc.createdAt} id={id} />
                <p className="mt-5">{doc.body}</p>
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
            <MessageForm />
            <MessageList />
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
