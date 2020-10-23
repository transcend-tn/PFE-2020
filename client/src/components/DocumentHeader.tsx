import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export interface DocumentHeaderProps {
  title: string;
  dateCeation: string;
}

function DocumentHeader(props: DocumentHeaderProps) {
  return (
    <Card className="p-3">
      <Card.Title>{props.title}</Card.Title>
      <Card.Text className="text-muted"> Créé {props.dateCeation}</Card.Text>
      <div className="d-flex flex-row-reverse">
        <Link to="edit-document">
          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default DocumentHeader;
