import React from 'react';
import CollaborationRequest from '../../../components/CollaborationRequest';
import { getCollaborationRequests } from '../../../services/document.service';
import { QueryStatus, useMutation, useQuery } from 'react-query';
import { disableMutation, enableMutation } from '../../../services/collaboration.service';
import { useParams } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';

function CollaborationRequestList() {
  const { id: documentId } = useParams<{ id: string }>();
  const { id: userId } = useParams<{ id: string }>();
  const [accept, { status }] = useMutation(enableMutation);
  const isAcceptLoading = QueryStatus.Loading === status;
  const [refuse, { status: etats }] = useMutation(disableMutation);
  const isRefuseLoading = QueryStatus.Loading === etats;

  const { isError, data = [], error } = useQuery('document:getcollaborationrequest', getCollaborationRequests);

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      <Accordion defaultActiveKey="0">
        {Object.keys(data).map((docId: any, idx: number) => {
          return (
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={`${idx}`}>
              {docId}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {data[docId].map((user:any,idx:number) => <CollaborationRequest
                    key={`collaboration-${idx}`}
                    id={user.id}
                    //on n'a pas les attributs (username, documentTitle, img) dans l'api/src/collaboration/collaboration.model.ts
                    username={user.username}
                    document={user.documentTitle}
                    img={user.img}
                    docId={documentId}
                    userId={userId}
                    onAccept={accept}
                    isAcceptLoading={isAcceptLoading}
                    onRefuse={refuse}
                    isRefuseLoading={isRefuseLoading}
                  /> )}
                  
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </>
  );
}

export default CollaborationRequestList;
