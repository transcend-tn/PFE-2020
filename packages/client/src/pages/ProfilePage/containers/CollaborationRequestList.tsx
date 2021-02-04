import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { IoMdDocument } from 'react-icons/io';
import { QueryStatus, useMutation, useQuery, useQueryCache } from 'react-query';
import CollaborationRequest from '../../../components/CollaborationRequest';
import { enableMutation, removeMutation } from '../../../services/collaboration.service';
import { getCollaborationRequests } from '../../../services/document.service';

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
                      fullName={user.fname + ' ' + user.lname}
                      username={user.username}
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
