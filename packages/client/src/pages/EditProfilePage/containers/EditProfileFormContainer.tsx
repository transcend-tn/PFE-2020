import React from 'react';
import { QueryStatus, useMutation } from 'react-query';
import EditProfileForm from '../../../components/EditProfileForm';
import { editUserService } from '../../../services/user.service';

function EditProfileFormContainer() {
  const [editUser, { status }] = useMutation(editUserService);
  const isLoading = QueryStatus.Loading === status;

  return <EditProfileForm editUser={editUser} isLoading={isLoading} />;
}

export default EditProfileFormContainer;
