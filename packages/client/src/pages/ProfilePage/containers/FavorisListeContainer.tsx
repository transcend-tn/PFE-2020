import { format } from 'date-fns';
import React, { useState } from 'react';
import ReactPlaceholder from 'react-placeholder';
import { QueryStatus, useMutation, useQuery, useQueryCache } from 'react-query';
import FavorisCard from '../../../components/FavorisCard';
import { getDocumentsFavoris } from '../../../services/document.service';
import { removeFavoritetMutation } from '../../../services/favorite.service';

const FavorisListeContainer = () => {
  const cache = useQueryCache();
  const [favs, setFavs] = useState(true);
  let { isLoading, isError, data = [], error } = useQuery(['documents:getFavoris'], getDocumentsFavoris);
  const [remove, { status: etats }] = useMutation(removeFavoritetMutation, {
    onSuccess: () => cache.invalidateQueries('documents:getFavoris'),
  });
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
              active={favs}
            />
          );
        })}
      </ReactPlaceholder>
    </>
  );
};

export default FavorisListeContainer;
