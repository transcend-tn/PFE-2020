import { format } from 'date-fns';
import React, { useState } from 'react';
import ReactPlaceholder from 'react-placeholder';
import { QueryStatus, useMutation, useQuery, useQueryCache } from 'react-query';
import FavorisCard from '../../../components/FavorisCard';
import { getDocumentsFavoris } from '../../../services/document.service';
import { removeFavoritetMutation } from '../../../services/favorite.service';
import { getUserByUsername } from '../../../services/user.service';
import { useStoreState } from '../../../hooks/store.hooks';

export interface FavorisListeProps {
  username: string;
}
const FavorisListeContainer = (props:FavorisListeProps) => {
  const { username } = props;
  const cache = useQueryCache();
  const [favs, setFavs] = useState(true);
  const currentUser = useStoreState((state) => state.user.user);
  const { isLoading:u_isLoading, isError:u_isError, data: user = {}, error:u_error } = useQuery(['user:getUserByUsername', username], getUserByUsername);
  let { isLoading, isError, data = [], error } = useQuery(['documents:getFavoris', user.id], getDocumentsFavoris);
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
          return (fav!==null?
            <FavorisCard
              key={`favoris-${idx}`}
              id={fav._id}
              timeEdit={format(new Date(fav.createdAt), 'd MMMM, HH:mm')}
              documenTitle={fav.title}
              onRemove={remove}
              isRemoveLoading={isRemoveLoading}
              active={favs}
              showStar={currentUser.id===user.id}
            />:null
          );
        })}
      </ReactPlaceholder>
    </>
  );
};

export default FavorisListeContainer;
