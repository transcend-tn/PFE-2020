import React from 'react';
import CollaborationRequest from '../../../components/CollaborationRequest';
import { getCollaborationRequests } from '../../../services/document.service';
import { QueryStatus, useMutation, useQuery } from 'react-query';
import { disableMutation, enableMutation } from '../../../services/collaboration.service';
import { useParams } from 'react-router-dom';


function CollaborationRequestList() {
    const { id: documentId } = useParams<{ id: string }>();
    const { id: userId } = useParams<{ id: string }>();
    const [accept, { status }] = useMutation(enableMutation);
    const isAcceptLoading = QueryStatus.Loading === status;
    const [refuse, { status: etats }] = useMutation(disableMutation);
    const isRefuseLoading = QueryStatus.Loading === etats;
    
    const { isError, data = [], error } = useQuery('document:getcollaborationrequest', getCollaborationRequests);
    console.log(data);
    if (isError) {
        return <span>Error: {error} !</span>;
    }
    
    return (
        <>
            {data.map((collab: any, idx: number) => {
              return (
                <CollaborationRequest key={`collaboration-${idx}`}
                    id={collab.id} 
                    username={collab.username} 
                    document={collab.documentTitle} 
                    img={collab.img}
                    docId={documentId}
                    userId={userId}
                    onAccept={accept}
                    isAcceptLoading={isAcceptLoading}
                    onRefuse={refuse}
                    isRefuseLoading={isRefuseLoading}
                />                
              );
            })}
        </>
      );    
}

export default CollaborationRequestList;