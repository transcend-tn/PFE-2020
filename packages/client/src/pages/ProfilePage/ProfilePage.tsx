import React from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import ProfileCardContainer from './containers/ProfileCardContainer';
import DocumentsListContainer from './containers/DocumentsListContainer';
import CollaborationRequestContainer from './containers/CollaborationRequestContainer';
import FavorisListeContainer from './containers/FavorisListeContainer';

const FAVORIS: string[] = ['1', '2'];

function ProfilePage() {
  return (
    <Row>
      <Col lg="6" className="mb-3">
        <ProfileCardContainer />
      </Col>
      <Col lg="6">
        <div className="card p-3">
          <Tabs defaultActiveKey="documents" id="uncontrolled-tab">
            <Tab eventKey="documents" title="Mes documents" className="mt-5">
              <DocumentsListContainer />
            </Tab>
            <Tab eventKey="favoris" title="Favoris" className="mt-5">
            <FavorisListeContainer/>
            </Tab>
            <Tab eventKey="requests" title="Collaborations" className="mt-5">                              
              <CollaborationRequestContainer />              
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
}

export default ProfilePage;