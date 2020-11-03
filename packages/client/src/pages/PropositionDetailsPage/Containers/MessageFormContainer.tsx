import React from 'react';
import { QueryStatus, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import MessageForm from '../../../components/MessageForm';
import { addrequestCommentMutation } from '../../../services/comment.service';


function MessageFormContainer() {
  const { id: reqId } = useParams<{ id: string }>();
  const [createComment, { status }] = useMutation(addrequestCommentMutation);
  const isLoading = QueryStatus.Loading === status;

  return <MessageForm createComment={createComment} isLoading={isLoading} reqId={reqId} />;
}

export default MessageFormContainer;
