import React from 'react';
import { useMutation, QueryStatus } from 'react-query';
import ChangePasswordForm from '../../../components/ChangePasswordForm';
import {  changePasswordService } from '../../../services/user.service';

function ChangePasswordFormContainer() {
  const [editPassword, { status }] = useMutation(changePasswordService);
  const isLoading = QueryStatus.Loading === status;

  return <ChangePasswordForm editPassword={editPassword} isLoading={isLoading} />;
}

export default ChangePasswordFormContainer;
