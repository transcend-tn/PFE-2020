import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { QueryStatus, useMutation } from 'react-query';
import * as Yup from 'yup';
import NewDocument from '../../../components/NewDocument';
import { documentCreateMutation } from '../../../services/document.service';

const NewDocumentContainer = () => {
  const [mutate, { status }] = useMutation(documentCreateMutation);
  const isLoading = QueryStatus.Loading === status;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    return setEditorState(editorState);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: (values) => {
      if (values.title !== '')
        mutate({
          body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          title: values.title,
        });
      values.title = '';
      setEditorState(EditorState.createEmpty());
    },
  });

  return (
    <NewDocument
      editorState={editorState}
      formik={formik}
      isLoading={isLoading}
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default NewDocumentContainer;
