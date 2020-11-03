import React, { useState } from 'react';
import MemberCard from './MemberCard';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { collaborationTeam } from '../services/collaboration.service';

const DATA: any = [
  {
    img: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 10) + '.jpg',
    username: 'Username 1',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/' + Math.floor(Math.random() * 10) + '.jpg',
    username: 'Username 2',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 10) + '.jpg',
    username: 'Username 3',
  },
];

function TeamMembersList() {
  const { id: docId } = useParams<{ id: string }>();
  const { isLoading, isError, data = [], error } = useQuery(['collaboration:getTeam', docId], collaborationTeam);
  const [pending, setPending] = useState(false);
  console.log(data)
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
            <Button variant="success" onClick={() => setPending(true)} disabled={pending}>
              {pending ? 'Pending' : 'Join Team'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default TeamMembersList;
