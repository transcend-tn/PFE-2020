import { format } from 'date-fns';
import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { QueryStatus, useMutation, useQuery } from 'react-query';
import FavorisCard from '../../../components/FavorisCard';
import { getDocumentsFavoris } from '../../../services/document.service';
import { removeFavoritetMutation } from '../../../services/favorite.service';

const FavorisListeContainer = () => {
  const { isLoading, isError, data = [], error } = useQuery(['documents:getFavoris'], getDocumentsFavoris);
  const [remove, { status: etats }] = useMutation(removeFavoritetMutation);
  const isRemoveLoading = QueryStatus.Loading === etats;

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      <ReactPlaceholder ready={!isLoading} showLoadingAnimation firstLaunchOnly>
        {data.map((fav: any, idx: number) => {
          return (
            <FavorisCard
              key={`favoris-${idx}`}
              id={fav._id}
              timeEdit={format(new Date(fav.createdAt), 'd MMMM, HH:mm')}
              documenTitle={fav.title}
              onRemove={remove}
              isRemoveLoading={isRemoveLoading}
              active
            />
          );
        })}
      </ReactPlaceholder>
    </>
  );
};

export default FavorisListeContainer;
