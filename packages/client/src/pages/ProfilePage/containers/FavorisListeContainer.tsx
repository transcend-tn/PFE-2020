import React from 'react';
import { useQuery } from 'react-query';
import FavorisCard from '../../../components/FavorisCard';
import { getFavoriteById } from '../../../services/favorite.service';

const FavorisListeContainer = () => {
  const { isError, data = [], error } = useQuery('favorie:getbyid', getFavoriteById);

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      {data.map((fav: any, idx: number) => {
        return <FavorisCard id={`id`} timeEdit={fav.timeEdit} document={fav.document} key={`favoris-${idx}`} 
          onAdd={fav.add}
           isAddLoading={fav.isAddLoading}
           onRemove={fav.remove}
           isRemoveLoading={fav.isRemoveLoading}
        />;
      })}
    </>
  );
};

export default FavorisListeContainer;
