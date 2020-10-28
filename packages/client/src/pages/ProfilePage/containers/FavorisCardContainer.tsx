import React from 'react';
import { useMutation, QueryStatus, useQuery } from 'react-query';
import { addFavoriteMutation } from '../../../services/favorite.service';
import FavorisCard from '../../../components/FavorisCard';

const FavorisCardContainer = () => {
  const [createFavoris, { status }] = useMutation(addFavoriteMutation);
  const isLoading = QueryStatus.Loading === status;

  return (
    <FavorisCard
      createFavoris={createFavoris}
      isLoading={isLoading}
      id={`id`}
      timeEdit={`timeEdit`}
      document={` document`}
    />
  );
};

export default FavorisCardContainer;
