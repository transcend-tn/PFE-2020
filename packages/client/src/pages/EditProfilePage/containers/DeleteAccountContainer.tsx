import React from 'react';
import DeleteAccountCard from '../../../components/DeleteAccountCard';

function DeleteAccountContainer() {
  // TODO
  // mutation deleteAccount
  // query getUserById (pour recuperer le username)

  const handleDelete = () => {
    console.log('handle delete: ');
  };

  return <DeleteAccountCard username={'@Username'} handleDelete={handleDelete} />;
}

export default DeleteAccountContainer;
