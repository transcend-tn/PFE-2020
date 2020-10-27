import { UserEdit } from '@tr/common';
import { useFormik } from 'formik';
import React from 'react';
import { useMutation, QueryStatus } from 'react-query';
import * as Yup from 'yup';
import EditProfileForm from '../../../components/EditProfileForm';
import { editUserMutation } from '../../../services/user.service';

function EditProfileFormContainer() {
  const [mutate, { status }] = useMutation(editUserMutation);
  const isLoading = QueryStatus.Loading === status;

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
    },
    validationSchema: Yup.object({
      fname: Yup.string().required('Veuillez saisir votre prénom !'),
      lname: Yup.string().required('Veuillez saisir votre nom !'),
      email: Yup.string().email('Addresse email invalide').required('Veuillez saisir votre email !'),
    }),
    onSubmit: (payload: UserEdit) => {
      mutate(payload);
    },
  });

  return <EditProfileForm formik={formik} isLoading={isLoading} />;
}

export default EditProfileFormContainer;
