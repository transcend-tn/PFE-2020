import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import MemberCard from '../../../components/MemberCard';
import { COLLABORATION_BY_ID } from '../../../constants/uris';
import { collaborationTeam } from '../../../services/collaboration.service';

function TeamMembersListContainer() {
  const [pending, setPending] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { isError, data = [], error } = useQuery(['collaboration:team', id], collaborationTeam);
  console.log('data: ', data);

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      <Card>
        <Card.Title>
          <h5 className="d-flex justify-content-center mt-4">Team Members</h5>
        </Card.Title>
        <Card.Body>
          {data.map((msg: any, idx: number) => {
            return <MemberCard img={msg.img} username={msg.username} key={`member-${idx}`} />;
          })}
          <hr />
          <div className="text-center">
            <Button variant="success" onClick={() => setPending(true)} disabled={pending}>
              {pending ? 'Pending' : 'Join Team'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default TeamMembersListContainer;
