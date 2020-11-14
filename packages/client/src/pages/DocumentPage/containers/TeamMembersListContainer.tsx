import { is } from 'date-fns/locale';
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import MemberCard from '../../../components/MemberCard';
import { useStoreState } from '../../../hooks/store.hooks';
import { collaborationTeam } from '../../../services/collaboration.service';

function TeamMembersListContainer() {
  const { id } = useParams<{ id: string }>();
  const { isError, data = [], error } = useQuery(['collaboration:getTeam', id], collaborationTeam);
  const currentUser = useStoreState((state) => state.user.user);
  const teamIds = data.map((member: any) => member.id);
  const isMember = teamIds.includes(currentUser.id);

  if (isError) {
    return <span>Error: {error} !</span>;
  }
if (data.length!=0)
  return (
    <>
      <Card>
        <Card.Title>
          <h5 className="d-flex justify-content-center mt-4">Team Members</h5>
        </Card.Title>
        <Card.Body>
          {data.map((member: any, idx: number) => {
            return <MemberCard img={member.img} username={member.username} key={`member-${idx}`} />;
          })}
          <hr />
          <div className="text-center">
          <Button
                variant={isMember ? "danger" :"success"}
                onClick={() => {
                  // appel webservice
                }}
              >
                 {isMember ? 'Leave Team' : 'Join Team'}
              </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
  return (null);
}

export default TeamMembersListContainer;
