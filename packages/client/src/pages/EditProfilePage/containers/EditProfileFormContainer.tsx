import React from 'react';
import { QueryStatus, useMutation, useQueryCache } from 'react-query';
import EditProfileForm from '../../../components/EditProfileForm';
import { editUserService } from '../../../services/user.service';

function EditProfileFormContainer() {
  const cache = useQueryCache();
  const [editUser, { status }] = useMutation(editUserService, {
    onSuccess: () => cache.invalidateQueries('user:getById'),
  });
  const isLoading = QueryStatus.Loading === status;

  return <EditProfileForm editUser={editUser} isLoading={isLoading} />;
}

export default EditProfileFormContainer;
