import React from 'react';
import { QueryStatus, useMutation, useQueryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import MessageForm from '../../../components/MessageForm';
import { addrequestCommentMutation } from '../../../services/comment.service';

function MessageFormContainer() {
  const { id: reqId } = useParams<{ id: string }>();
  const cache = useQueryCache();
  const [createComment, { status }] = useMutation(addrequestCommentMutation, {
    onSuccess: () => cache.invalidateQueries('comments:getbyreq'),
  });

  const isLoading = QueryStatus.Loading === status;

  return <MessageForm createComment={createComment} isLoading={isLoading} reqId={reqId} />;
}

export default MessageFormContainer;
