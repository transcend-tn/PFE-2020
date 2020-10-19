import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Favoris from '../components/FavorisCard';
import ProfileCard from '../components/ProfileCard';
import Card from 'react-bootstrap/esm/Card';

const FAVORIS: number[] = [1, 2];

function FavorisPage() {
  return (
    <Row>
      <Col>
        <ProfileCard followers={15} username="Username" following={23} />
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <h5 className="mb-5">Mes Favoris</h5>
            {FAVORIS.map((value) => {
              return <Favoris key={`favoris-${value}`} document="document 1" timeEdit="12/04/2019" />;
            })}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default FavorisPage;
