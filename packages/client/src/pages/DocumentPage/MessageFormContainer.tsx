import React from 'react';
import { QueryStatus, useMutation } from 'react-query';
import MessageForm from '../../components/MessageForm';
import { addCommentMutation } from '../../services/comment.service';

function MessageFormContainer() {
    const [createComment, { status }] = useMutation(addCommentMutation);
    const isLoading = QueryStatus.Loading === status;
    
    return <MessageForm createComment={createComment} isLoading={isLoading} />;
}

export default MessageFormContainer;