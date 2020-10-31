import React from 'react';
import { QueryStatus, useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CollaborationRequest from '../../../components/CollaborationRequest';
import { useStoreState } from '../../../hooks/store.hooks';
import { collaborationTeam, joinTeamMutation, leaveTeamMutation } from '../../../services/collaboration.service';

function CollaborationRequestContainer() {
  const user = useStoreState((state) => state.user.user);
  const { id } = useParams<{ id: string }>();
  const { isError, data = [], error } = useQuery(['collaboration:team', id], collaborationTeam);
  const [accepter, { status }] = useMutation(joinTeamMutation);
  const isLoading = QueryStatus.Loading === status;
  const [refuser, { status: etats }] = useMutation(leaveTeamMutation);
  const chargement = QueryStatus.Loading === etats;
  

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      {data.map((collab: any, idx: number) => {
        return (
          <CollaborationRequest img={collab.img} username={collab.username} document={collab.document} id={collab.id} key={`request-${idx}`} 
            accepter={accepter}
            isLoading={isLoading}
            refuser={refuser}
            chargement={chargement} />
        );  
      })}
    </>
  )
}

export default CollaborationRequestContainer;
