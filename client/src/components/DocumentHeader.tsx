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
    <Card>
      <Card.Title className="mt-3 ml-3 mb-1">{props.title}</Card.Title>
      <Card.Text className="text-muted ml-3"> Créé à {props.dateCeation}</Card.Text>
      <div className="d-flex flex-row-reverse m-3">
        <Link to="edit-document">
          <Button variant="secondary" type="submit">
            Edit
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default DocumentHeader;
