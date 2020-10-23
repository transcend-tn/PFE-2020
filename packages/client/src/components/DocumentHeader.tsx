import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';

export interface DocumentHeaderProps {
  title: string;
  createdAt: string;
}

function DocumentHeader(props: DocumentHeaderProps) {
  return (
    <Card className="card-header p-3">
      <Card.Title>{props.title}</Card.Title>
      <Card.Text className="text-muted"> Crée le : {props.createdAt}</Card.Text>
      <div className="d-flex flex-row-reverse">
        <Link to="edit-document">
          <Button variant="secondary" size="sm" type="submit">
            Modifier
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default DocumentHeader;
