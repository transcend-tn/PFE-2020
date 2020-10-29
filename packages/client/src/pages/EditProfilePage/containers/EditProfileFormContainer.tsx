import React from 'react';
import { QueryStatus, useMutation } from 'react-query';
import EditProfileForm from '../../../components/EditProfileForm';
import { useStoreState } from '../../../hooks/store.hooks';
import { editUserService } from '../../../services/user.service';

function EditProfileFormContainer() {
  const [editUser, { status }] = useMutation(editUserService);
  const user = useStoreState((state) => state.user.user);
  const isLoading = QueryStatus.Loading === status;

  return <EditProfileForm editUser={editUser} isLoading={isLoading} userId={user.id} />;
}

export default EditProfileFormContainer;
