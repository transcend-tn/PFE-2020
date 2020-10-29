import React from 'react';
import { useMutation, QueryStatus } from 'react-query';
import ChangePasswordForm from '../../../components/ChangePasswordForm';
import { useStoreState } from '../../../hooks/store.hooks';
import { changePassword } from '../../../services/user.service';

function ChangePasswordFormContainer() {
  const [editPassword, { status }] = useMutation(changePassword);
  const isLoading = QueryStatus.Loading === status;
  const user = useStoreState((state) => state.user.user);

  return <ChangePasswordForm editPassword={editPassword} isLoading={isLoading} userId={user.id} />;
}

export default ChangePasswordFormContainer;
