import React from 'react';
import ReactPlaceholder from 'react-placeholder/lib';
import { useQuery } from 'react-query';
import DeleteAccountCard from '../../../components/DeleteAccountCard';
import ProfileCardLoader from '../../../components/loaders/ProfileCardLoader';
import { useStoreState } from '../../../hooks/store.hooks';
import { getUserById } from '../../../services/user.service';

function DeleteAccountContainer() {
  const user = useStoreState((state) => state.user.user);
  const { isLoading, isError, data = {}, error } = useQuery(['user:getById', user.id], getUserById);

  const handleDelete = () => {
    // TODO
    // mutation deleteAccount
    console.log('handle delete: ', data);
  };

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <ReactPlaceholder ready={!isLoading} customPlaceholder={<ProfileCardLoader />}>
      <DeleteAccountCard user={data} handleDelete={handleDelete} />
    </ReactPlaceholder>
  );
}

export default DeleteAccountContainer;
