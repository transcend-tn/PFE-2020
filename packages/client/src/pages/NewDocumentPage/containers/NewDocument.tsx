import React from 'react';
import { QueryStatus, useMutation } from 'react-query';
import NewDocument from '../../../components/NewDocument';
import { createDocumentMutation } from '../../../services/document.service';

const NewDocumentContainer = () => {
  const [createDocument, { status }] = useMutation(createDocumentMutation);
  const isLoading = QueryStatus.Loading === status;

  return <NewDocument createDocument={createDocument} isLoading={isLoading} />;
};

export default NewDocumentContainer;
