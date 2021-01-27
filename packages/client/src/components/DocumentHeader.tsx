import { formatDistance } from 'date-fns';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';
import { DOCUMENT_EDIT, PROFILE } from '../constants/uris';

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
      <div className="input-group d-flex justify-content-between">
        <div className="mt-0 font-weight-light">
          <h4>{title}</h4>
          <Link to={PROFILE(username)}>{username}</Link>
          {'\xa0'}
          {formatDistance(new Date(), new Date(createdAt))}
          {'\xa0'}ago
        </div>

        <Link to={DOCUMENT_EDIT(docId)}>
          <Button variant="btn btn-btn btn-outline-secondary" size="sm" type="submit">
            Modifier
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default DocumentHeader;
