import React from 'react';
import { useQuery } from 'react-query';
import { getCommentByDocId } from '../../../services/comment.service';
import ReactPlaceholder from 'react-placeholder';
import MessageCard from '../../../components/MessageCard';
import { useParams } from 'react-router-dom';

function MessageListContainer() {
  const { id: docId } = useParams<{ id: string }>();
  const { isLoading, isError, data = [], error } = useQuery(['comments:getbyid', docId], getCommentByDocId);

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      <ReactPlaceholder ready={!isLoading} showLoadingAnimation firstLaunchOnly>
        {data.map((msg: any, idx: number) => {
          return (
            <MessageCard img={msg.img} username={msg.username} time={msg.time} body={msg.body} key={`message-${idx}`} />
          );
        })}
      </ReactPlaceholder>
    </>
  );
}

export default MessageListContainer;
