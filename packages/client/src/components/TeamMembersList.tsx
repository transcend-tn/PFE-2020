import React, { useState } from 'react';
import MemberCard from './MemberCard';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';

const DATA: any = [
  {
    img: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 10) + '.jpg',
    username: 'Username',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/' + Math.floor(Math.random() * 10) + '.jpg',
    username: 'Username',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 10) + '.jpg',
    username: 'Username',
  },
];

function TeamMembersList() {
  const [pending, setPending] = useState(false);
  return (
    <>
      <Card>
        <Card.Title>
          <h5 className="d-flex justify-content-center mt-4">Team Members</h5>
        </Card.Title>
        <Card.Body>
          {DATA.map((msg: any) => {
            return <MemberCard img={msg.img} username={msg.username} />;
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
