import React from 'react';
import CollaborationRequest from '../../../components/CollaborationRequest';
import { getCollaborationRequests } from '../../../services/document.service';
import { QueryStatus, useMutation, useQuery, useQueryCache } from 'react-query';
import { removeMutation, enableMutation } from '../../../services/collaboration.service';
import { useParams } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import { IoMdDocument } from 'react-icons/io';

function CollaborationRequestList() {
  const cache = useQueryCache();

  const { isError, data = [], error } = useQuery('document:getcollabortaionrequest', getCollaborationRequests);

  const [accept, { status: accept_status }] = useMutation(enableMutation, {
    onSuccess: () => cache.invalidateQueries('document:getcollabortaionrequest'),
  });
  const isAcceptLoading = QueryStatus.Loading === accept_status;

  const [refuse, { status: refuse_satuts }] = useMutation(removeMutation, {
    onSuccess: () => cache.invalidateQueries('document:getcollabortaionrequest'),
  });
  const isRefuseLoading = QueryStatus.Loading === refuse_satuts;

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      <Accordion>
        {Object.keys(data).map((docTitle: any, idx: number) => {
          return (
            <Card key={`collaboration-${idx}`}>
              <Accordion.Toggle as={Card.Header} eventKey={`${idx}`}>
                <IoMdDocument size={25} /> {docTitle.split('#')[0]}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${idx}`}>
                <Card.Body>
                  {data[docTitle].map((user: any, idx: number) => (
                    <CollaborationRequest
                      key={`collaboration-${idx}`}
                      userId={user.id}
                      //on n'a pas les attributs (username, documentTitle, img) dans l'api/src/collaboration/collaboration.model.ts
                      username={user.username}
                      data={data}
                      img={user.img}
                      docId={docTitle.split('#').pop()}
                      onAccept={accept}
                      isAcceptLoading={isAcceptLoading}
                      onRefuse={refuse}
                      isRefuseLoading={isRefuseLoading}
                    />
                  ))}
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
