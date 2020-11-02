import React from 'react';
import { useMutation, QueryStatus } from 'react-query';
import { addFavoriteMutation, removeFavoritetMutation } from '../../../services/favorite.service';
import FavorisCard from '../../../components/FavorisCard';

const FavorisCardContainer = () => {
  const [add, { status }] = useMutation(addFavoriteMutation);
  const isAddLoading = QueryStatus.Loading === status;
  const [remove, { status: etats  }] = useMutation(removeFavoritetMutation);
  const isRemoveLoading = QueryStatus.Loading === status;

  return <FavorisCard id={`id`} timeEdit={`timeEdit`} document={` document`} 
  
           onAdd={add}
           isAddLoading={isAddLoading}
           onRemove={remove}
           isRemoveLoading={isRemoveLoading}
  />;
};

export default FavorisCardContainer;
