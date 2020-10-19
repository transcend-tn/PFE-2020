import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CollaborationRequest from '../components/CollaborationRequest';
import ProfileCard from '../components/ProfileCard';
import Card from 'react-bootstrap/esm/Card';

const REQUESTS: number[] = [1, 2];

function RequestsPage() {
  return (
    <Row>
      <Col>
        <ProfileCard followers={15} username="Username" following={23} />
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <h5 className="mb-5">Demandes de Collaborations</h5>
            {REQUESTS.map((value) => {
              return <CollaborationRequest key={`request-${value}`} username="Username 1" document="Document 1" />;
            })}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default RequestsPage;
