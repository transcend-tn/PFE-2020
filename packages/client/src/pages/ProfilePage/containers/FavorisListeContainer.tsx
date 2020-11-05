import React from 'react';
import { QueryStatus, useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import FavorisCard from '../../../components/FavorisCard';
import { addFavoriteMutation, getFavoriteById, removeFavoritetMutation } from '../../../services/favorite.service';
import { format } from 'date-fns';
import ReactPlaceholder from 'react-placeholder';

const FavorisListeContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading,isError, data = [], error } = useQuery(['favorie:getbyid',id], getFavoriteById);
  const [add, { status }] = useMutation(addFavoriteMutation);
  const isAddLoading = QueryStatus.Loading === status;
  const [remove, { status: etats  }] = useMutation(removeFavoritetMutation);
  const isRemoveLoading = QueryStatus.Loading === etats;

  if (isError) {
    return <span>Error: {error} !</span>;
  }
     console.log(data)
  return (
    <>
     <ReactPlaceholder ready={!isLoading} showLoadingAnimation firstLaunchOnly>
      {data.map((fav: any, idx: number) => {
        return <FavorisCard
        key={`favoris-${idx}`} 
        id={`id`} 
        timeEdit={format(new Date(fav.createdAt), 'd MMMM, HH:mm')}
        documenTitle={fav.documentId} 
        onAdd={add}
        isAddLoading={isAddLoading}
        onRemove={remove}
        isRemoveLoading={isRemoveLoading}
        
        />;
      })}
       </ReactPlaceholder>
    </>
  );
};

export default FavorisListeContainer;