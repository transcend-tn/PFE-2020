import React from "react";
import { Row, Col } from "react-bootstrap";
import CollaborationRequest from "../components/CollaborationRequest";
import ProfileCard from "../components/ProfileCard";

const REQUESTS: number[] = [1, 2];

function RequestsPage() {
  return (
    <Row>
      <Col>
        <ProfileCard followers={15} username="Username" following={23} />
      </Col>
      <Col>
        <div>
          <h2 className="mb-3">Mes Demandes</h2>
          <>
           {REQUESTS.map(value => {
             return (
               <CollaborationRequest key={`request-${value}`} username="Username 1" document="Document 1" />
             )
           })}
          </>
        </div>
      </Col>
    </Row>
  );
}

export default RequestsPage;
