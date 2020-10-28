import React from 'react';
import ReactPlaceholder from 'react-placeholder/lib';
import { useQuery } from 'react-query';
import DeleteAccountCard from '../../../components/DeleteAccountCard';
import ProfileCardLoader from '../../../components/loaders/ProfileCardLoader';
import { getUserById } from '../../../services/user.service';

function DeleteAccountContainer() {
  const { isLoading, isError, data = [], error } = useQuery('user:getUserById', getUserById);

  const handleDelete = () => {
    // TODO
    // mutation deleteAccount
    console.log('handle delete: ');
  };

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <ReactPlaceholder ready={!isLoading} customPlaceholder={<ProfileCardLoader />}>
      <DeleteAccountCard username={data.username} handleDelete={handleDelete} />
    </ReactPlaceholder>
  );
}

export default DeleteAccountContainer;
