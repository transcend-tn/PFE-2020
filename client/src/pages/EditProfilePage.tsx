import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import DeleteAccountCard from '../components/DeleteAccountCard';
import EditProfileForm from '../components/EditProfileForm';

function EditProfilePage() {
  return (
    <Row>
      <Col sm={4}>
        <DeleteAccountCard username="@Username" />
      </Col>
      <Col sm={8}>
        <Card>
          <Card.Body>
            <h5 className="mb-5">Modifier vos coordonnées</h5>
            <EditProfileForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EditProfilePage;
