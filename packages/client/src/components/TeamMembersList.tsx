import React from 'react';
import MemberCard from './MemberCard';

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
  return (
    <>
      {DATA.map((msg: any) => {
        return <MemberCard img={msg.img} username={msg.username} />;
      })}
    </>
  );
}

export default TeamMembersList;
