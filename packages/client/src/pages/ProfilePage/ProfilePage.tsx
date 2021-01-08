import React from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import ProfileCardContainer from './containers/ProfileCardContainer';
import DocumentsListContainer from './containers/DocumentsListContainer';
import FavorisListeContainer from './containers/FavorisListeContainer';
import CollaborationRequestList from './containers/CollaborationRequestList';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  return (
    <Row>
      <Col lg="6" className="mb-3">
        <ProfileCardContainer username={id}/>
      </Col>
      <Col lg="6">
        <div className="card p-3">
          <Tabs defaultActiveKey="documents" id="uncontrolled-tab">
            <Tab eventKey="documents" title="Mes documents" className="mt-5">
              <DocumentsListContainer  username={id} />
            </Tab>
            <Tab eventKey="favoris" title="Favoris" className="mt-5">
            <FavorisListeContainer/>
            </Tab>
            <Tab eventKey="requests" title="Collaborations" className="mt-5">                              
              <CollaborationRequestList />              
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
}

export default ProfilePage;