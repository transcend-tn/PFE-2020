import React from 'react';
import { Row, Col, Tab, Tabs } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import ChangePasswordForm from '../components/ChangePasswordForm';
import DeleteAccountCard from '../components/DeleteAccountCard';
import EditProfileForm from '../components/EditProfileForm';

function EditProfilePage() {
  return (
    <Row>
      <Col lg={6} className="mb-3">
        <DeleteAccountCard username="@Username" />
      </Col>
      <Col lg={6}>
        <Card>
          <Card.Body>
            <Tabs defaultActiveKey="edit-profile" id="uncontrolled-tab">
              <Tab eventKey="edit-profile" title="Modifier vos coordonnées">
                <EditProfileForm />
              </Tab>
              <Tab eventKey="change-password" title="Chnager mot de passe">
                <ChangePasswordForm />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EditProfilePage;
