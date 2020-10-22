import React from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import Favoris from '../components/FavorisCard';
import ProfileCard from '../components/ProfileCard';
import CollaborationRequest from '../components/CollaborationRequest';

const FAVORIS: number[] = [1, 2];
const REQUESTS: number[] = [1, 2];
const DOCS: number[] = [1, 2];

function ProfilePage() {
  return (
    <Row>
      <Col lg="6" className="mb-3">
        <ProfileCard followers={15} username="Username" following={23} />
      </Col>
      <Col lg="6">
        <div className="card p-3">
          <Tabs defaultActiveKey="documents" id="uncontrolled-tab">
            <Tab eventKey="documents" title="Mes documents" className="mt-5">
              {DOCS.map((value) => {
                return <Favoris key={`favoris-${value}`} document="document 1" timeEdit="12/04/2019" />;
              })}
            </Tab>
            <Tab eventKey="favoris" title="Favoris" className="mt-5">
              {FAVORIS.map((value) => {
                return <Favoris key={`favoris-${value}`} document="document 1" timeEdit="12/04/2019" />;
              })}
            </Tab>
            <Tab eventKey="requests" title="Collaborations" className="mt-5">
              {REQUESTS.map((value) => {
                return <CollaborationRequest key={`request-${value}`} username="Username 1" document="Document 1" />;
              })}
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
}

export default ProfilePage;
