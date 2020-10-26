import React from 'react';
import { useQuery } from 'react-query';
import Favoris from '../../../components/FavorisCard';
import { documentgetAllQuery } from '../../../services/document.service';

function DocumentsList() {
  const { isLoading, isError, data = [], error } = useQuery('documents:getall', documentgetAllQuery);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      {data.map((doc: any) => {
        return <Favoris key={`favoris-${doc.id}`} document={doc.title} timeEdit={doc.updatedAt} />;
      })}
    </>
  );
}

export default DocumentsList;
