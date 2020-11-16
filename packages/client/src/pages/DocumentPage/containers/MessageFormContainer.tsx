import React from 'react';
import { queryCache, QueryStatus, useMutation, useQueryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import MessageForm from '../../../components/MessageForm';
import { addCommentMutation } from '../../../services/comment.service';

//@ts-ignore-line
window.queryCache = queryCache;

function MessageFormContainer() {
  const { id: docId } = useParams<{ id: string }>();
  const cache = useQueryCache();
  const [createComment, { status }] = useMutation(addCommentMutation, {
    onSuccess: () => cache.invalidateQueries('comments:getbyid'),
  });
  const isLoading = QueryStatus.Loading === status;

  return <MessageForm createComment={createComment} isLoading={isLoading} docId={docId} />;
}

export default MessageFormContainer;
