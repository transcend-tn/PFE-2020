import { format } from 'date-fns';
import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { QueryStatus, useMutation, useQuery } from 'react-query';
import Favoris from '../../../components/FavorisCard';
import { useStoreState } from '../../../hooks/store.hooks';
import { getDocumentsByOwner, getDocumentsFavoris } from '../../../services/document.service';
import { addFavoriteMutation, removeFavoritetMutation } from '../../../services/favorite.service';

function DocumentsListContainer() {
  const user = useStoreState((state) => state.user.user);
  const { isLoading: d_isLoading, isError: d_isError, data: d_data = [], error: d_error } = useQuery(
    ['documents:getbyowner', user.id],
    getDocumentsByOwner,
  );
  const { isLoading: f_isLoading, isError: f_isError, data: f_data = [], error: f_error } = useQuery(
    ['documents:getFavoris'],
    getDocumentsFavoris,
  );

  const [add, { status }] = useMutation(addFavoriteMutation);
  const isAddLoading = QueryStatus.Loading === status;
  const [remove, { status: etats }] = useMutation(removeFavoritetMutation);
  const isRemoveLoading = QueryStatus.Loading === etats;

  if (d_isError || f_isError) {
    return <span>Error: {d_error || f_error} !</span>;
  }

  return (
    <>
      <ReactPlaceholder ready={!d_isLoading} showLoadingAnimation firstLaunchOnly>
        {d_data.map((doc: any) => {
          return (
            <Favoris
              key={`favoris-${doc.id}`}
              documenTitle={doc.title}
              timeEdit={format(new Date(doc.createdAt), 'd MMMM, HH:mm')}
              id={doc.id}
              active={f_data.map((d: any) => d.id).includes(doc.id)}
              onAdd={add}
              isAddLoading={isAddLoading}
              onRemove={remove}
              isRemoveLoading={isRemoveLoading}
            />
          );
        })}
      </ReactPlaceholder>
    </>
  );
}

export default DocumentsListContainer;
