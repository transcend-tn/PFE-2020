import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { useQuery } from 'react-query';
import Favoris from '../../../components/FavorisCard';
import { documentgetAllQuery } from '../../../services/document.service';

function DocumentsList() {
  const { isLoading, isError, data = [], error } = useQuery('documents:getall', documentgetAllQuery);

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      <ReactPlaceholder ready={!isLoading} showLoadingAnimation firstLaunchOnly>
        {data.map((doc: any) => {
          return <Favoris key={`favoris-${doc.id}`} document={doc.title} timeEdit={doc.updatedAt} />;
        })}
      </ReactPlaceholder>
    </>
  );
}

export default DocumentsList;
