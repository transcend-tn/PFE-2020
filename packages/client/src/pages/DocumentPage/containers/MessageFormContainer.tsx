import React from 'react';
import { queryCache, QueryStatus, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import MessageForm from '../../../components/MessageForm';
import { addCommentMutation } from '../../../services/comment.service';

//@ts-ignore-line
window.queryCache = queryCache;

function MessageFormContainer() {
  const { id: docId } = useParams<{ id: string }>();
  const [createComment, { status }] = useMutation(addCommentMutation, {
    onSuccess: (data) => {
      console.log('data: ', data);
      return queryCache.setQueryData(['comments:getbyid', { id: docId }], data);
    },
  });
  const isLoading = QueryStatus.Loading === status;

  return <MessageForm createComment={createComment} isLoading={isLoading} docId={docId} />;
}

export default MessageFormContainer;
