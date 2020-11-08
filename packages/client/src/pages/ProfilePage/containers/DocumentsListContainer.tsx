import { format } from 'date-fns';
import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { useQuery } from 'react-query';
import Favoris from '../../../components/FavorisCard';
import { useStoreState } from '../../../hooks/store.hooks';
import { getDocumentsByOwner } from '../../../services/document.service';

function DocumentsListContainer() {
  const user = useStoreState((state) => state.user.user);
  const { isLoading, isError, data = [], error } = useQuery(['documents:getbyowner', user.id], getDocumentsByOwner);
  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      <ReactPlaceholder ready={!isLoading} showLoadingAnimation firstLaunchOnly>
        {data.map((doc: any) => {
          return (
            <Favoris
              key={`favoris-${doc.id}`}
              document={doc.title}
              timeEdit={format(new Date(doc.createdAt), 'd MMMM, HH:mm')}
              id={doc.id}
            />
          );
        })}
      </ReactPlaceholder>
    </>
  );
}

export default DocumentsListContainer;
