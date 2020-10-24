import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import Vote from '../components/Vote';

const pr = {
  title: 'document-01',
  createdAt: '01/10/2020',
  body:
    'Id duis reprehenderit nostrud sint ea nostrud fugiat aliqua exercitation nostrud nostrud ad do mollit. Dolor reprehenderit culpa pariatur duis aute duis ut dolore. Minim officia do Lorem sunt sit nulla Lorem. Ut non velit irure nisi sit Lorem cillum nisi laboris labore qui est minim ad. Amet do officia officia amet voluptate ex voluptate cupidatat reprehenderit ullamco ad cillum consectetur. Consequat deserunt id eu adipisicing irure dolore deserunt eu duis tempor ut adipisicing. Aliquip et est quis ut consectetur qui Lorem ullamco aliqua id enim cillum.',
};

function PropositionDetailsPage() {
  return (
    <>
      <Row>
        <Col lg="8" className="mb-3">
          <div className="card p-3">
            <h2 className="text-center text-primary mt-3 mb-5">Proposition de Modification</h2>
            <Card>
              <Card.Body>
                <Card.Title>{pr.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"> {pr.createdAt}</Card.Subtitle>
                <Card.Text>{pr.body}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="bg-color-secondary card p-3 mt-5">
            <MessageForm />
            <MessageList />
          </div>
        </Col>

        <Col lg="4">
          <Vote yes={50} no={20} />
        </Col>
      </Row>
    </>
  );
}

export default PropositionDetailsPage;
