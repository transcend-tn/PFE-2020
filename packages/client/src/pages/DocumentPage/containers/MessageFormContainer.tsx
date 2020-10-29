import React from 'react';
import { QueryStatus, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import MessageForm from '../../../components/MessageForm';
import { addCommentMutation } from '../../../services/comment.service';

function MessageFormContainer() {
  const { id: docId } = useParams<{ id: string }>();
  const [createComment, { status }] = useMutation(addCommentMutation);
  const isLoading = QueryStatus.Loading === status;

  return <MessageForm createComment={createComment} isLoading={isLoading} docId={docId} />;
}

export default MessageFormContainer;
