import React from 'react';
import { QueryStatus, useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CollaborationRequest from '../../../components/CollaborationRequest';
import { collaborationTeam, joinTeamMutation, leaveTeamMutation } from '../../../services/collaboration.service';

function CollaborationRequestContainer() {
  const { id } = useParams<{ id: string }>();
  const { isError, data = [], error } = useQuery(['collaboration:team', id], collaborationTeam);
  const [join, { status }] = useMutation(joinTeamMutation);
  const isJoinLoading = QueryStatus.Loading === status;
  const [leave, { status: etats }] = useMutation(leaveTeamMutation);
  const isLeaveLoading = QueryStatus.Loading === etats;
  

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      {data.map((collab: any, idx: number) => {
        return (
          <CollaborationRequest img={collab.img} username={collab.username} document={collab.document} id={collab.id} key={`request-${idx}`} 
            onJoin={join}
            isJoinLoading={isJoinLoading}
            onLeave={leave}
            isLeaveLoading={isLeaveLoading} />
        );  
      })}
    </>
  )
}

export default CollaborationRequestContainer;
