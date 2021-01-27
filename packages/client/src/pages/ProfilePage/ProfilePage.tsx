import React from 'react';
import { Alert, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useStoreState } from '../../hooks/store.hooks';
import { getUserByUsername } from '../../services/user.service';
import CollaborationRequestList from './containers/CollaborationRequestList';
import DocumentsListContainer from './containers/DocumentsListContainer';
import FavorisListeContainer from './containers/FavorisListeContainer';
import ProfileCardContainer from './containers/ProfileCardContainer';
function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const currentUser = useStoreState((state) => state.user.user);
  const { status, data: user = {} } = useQuery(['user:getUserByUsername', id], getUserByUsername);

  if (user.username === undefined && status === 'success') {
    return (
      <Alert key="error" variant="danger">
        <b>{id}</b> not found !
      </Alert>
    );
  }

  return (
    <Row>
      <Col lg="6" className="mb-3">
        <ProfileCardContainer username={id} />
      </Col>
      <Col lg="6">
        <div className="card p-3">
          <Tabs defaultActiveKey="documents" id="uncontrolled-tab">
            <Tab eventKey="documents" title="Documents" className="mt-5">
              <DocumentsListContainer username={id} />
            </Tab>
            <Tab eventKey="favoris" title="Favoris" className="mt-5">
              <FavorisListeContainer username={id} />
            </Tab>
            {currentUser.id === user.id && (
              <Tab eventKey="requests" title="Collaborations" className="mt-5">
                <CollaborationRequestList />
              </Tab>
            )}
          </Tabs>
        </div>
      </Col>
    </Row>
  );
}

export default ProfilePage;
