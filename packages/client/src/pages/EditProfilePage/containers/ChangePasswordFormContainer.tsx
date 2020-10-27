import { UserChangePassword } from '@tr/common';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import ChangePasswordForm from '../../../components/ChangePasswordForm';

function ChangePasswordFormContainer() {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Old Password is required'),

      newPassword: Yup.string().required('New Password is required'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    }),
    onSubmit: (values: UserChangePassword) => {
      console.log(values);
    },
  });

  return <ChangePasswordForm formik={formik} />;
}

export default ChangePasswordFormContainer;
