import React from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import ChangePasswordFormContainer from './containers/ChangePasswordFormContainer';
import DeleteAccountContainer from './containers/DeleteAccountContainer';
import EditProfileFormContainer from './containers/EditProfileFormContainer';

function EditProfilePage() {
  return (
    <Row>
      <Col lg={6} className="mb-3">
        <DeleteAccountContainer />
      </Col>
      <Col lg={6}>
        <Card>
          <Card.Body>
            <Tabs defaultActiveKey="edit-profile" id="uncontrolled-tab">
              <Tab eventKey="edit-profile" title="Modifier vos coordonnées">
                <EditProfileFormContainer />
              </Tab>
              <Tab eventKey="change-password" title="Changer mot de passe">
                <ChangePasswordFormContainer />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EditProfilePage;
