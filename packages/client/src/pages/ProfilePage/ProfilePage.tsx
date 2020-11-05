import React from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import Favoris from '../../components/FavorisCard';
import ProfileCardContainer from './containers/ProfileCardContainer';
import DocumentsListContainer from './containers/DocumentsListContainer';
import CollaborationRequestList from './containers/CollaborationRequestList';


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
              {FAVORIS.map((value) => {
                return <Favoris key={`favoris-${value}`} document="document 1" timeEdit="12/04/2019" id={value} />;
              })}
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
