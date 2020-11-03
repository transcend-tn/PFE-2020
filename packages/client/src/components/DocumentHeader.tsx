import { format, formatRelative, subDays } from 'date-fns';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/esm/Card';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { DOCUMENT_EDIT } from '../constants/uris';
import { getDocumentById } from '../services/document.service';

export interface DocumentHeaderProps {
  title: string;
  createdAt: string;
  docId: string;
}

function DocumentHeader(props: DocumentHeaderProps) {
  const { docId, title, createdAt} = props;
  const { id } = useParams<{ id: string }>();
  const { data} = useQuery([id], getDocumentById);
  console.log(data)
  const date = format (new Date (data.createdAt),"d/MM/yyyy, HH:mm")

  return (
    <Card className="card-header p-3">
      <Card.Title>{title}</Card.Title>
      <Card.Text className="text-muted"> Crée le {date} </Card.Text>
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
