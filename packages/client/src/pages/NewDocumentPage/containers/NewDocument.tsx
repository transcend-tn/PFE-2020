import React from 'react';
import { QueryStatus, useMutation } from 'react-query';
import NewDocument from '../../../components/NewDocument';
import { createDocumentMutation } from '../../../services/document.service';
import { useParams } from 'react-router-dom';

const NewDocumentContainer = () => {
  const { id: docId } = useParams<{ id: string }>();
  const [createDocument, { status }] = useMutation(createDocumentMutation);
  const isLoading = QueryStatus.Loading === status;

  return <NewDocument createDocument={createDocument} isLoading={isLoading} docId={docId} />;
};

export default NewDocumentContainer;
