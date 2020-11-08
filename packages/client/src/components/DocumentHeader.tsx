import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';
import { DOCUMENT_EDIT } from '../constants/uris';

export interface DocumentHeaderProps {
  title: string;
  createdAt: string;
  docId: string;
  username: string;
}

function DocumentHeader(props: DocumentHeaderProps) {
  const { docId, title, createdAt, username } = props;

  return (
    <Card className="card-header p-3">
      <Card.Title>{title}</Card.Title>
      <Card.Text className="text-muted"> {createdAt} </Card.Text>
      <Card.Link className="text-muted"> {username} </Card.Link>
      <div className="d-flex flex-row-reverse">
        <Link to={DOCUMENT_EDIT(docId)}>
          <Button variant="secondary" size="sm" type="submit">
            Modifier
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default DocumentHeader;
