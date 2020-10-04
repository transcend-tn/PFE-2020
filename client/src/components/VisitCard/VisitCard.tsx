import React from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";

import { ChildrenProps } from "../../interfaces/children.interface";

export interface VisitCardProps extends ChildrenProps {
  name: string;
  gender: string;
  email: string;
  friends?: any[];
}

const VisitCard = ({ name, gender, email, friends }: VisitCardProps) => {
  return (
    <Card className="mr-3 mb-3 w-25">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{gender}</Card.Text>
        <Card.Text>{email}</Card.Text>
        <Button variant="primary" className="mt-3">Details</Button>
      </Card.Body>
    </Card>
  );
};

export default VisitCard;
