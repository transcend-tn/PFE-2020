import React from 'react';
import MessageCard from './MessageCard';

const DATA: any = [
  {
    img: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 10) + '.jpg',
    username: 'Username',
    body:
      'Laborum sint exercitation et nostrud eiusmod non incididunt quis nulla enim voluptate voluptate occaecat adipisicing.',
    time: '10/10/2020',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/' + Math.floor(Math.random() * 10) + '.jpg',
    username: 'Username',
    body:
      'Laborum sint exercitation et nostrud eiusmod non incididunt quis nulla enim voluptate voluptate occaecat adipisicing. Tempor consectetur dolor commodo quis nulla officia commodo non et laborum adipisicing reprehenderit fugiat reprehenderit.',
    time: '10/10/2020',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 10) + '.jpg',
    username: 'Username',
    body:
      'Laborum sint exercitation et nostrud eiusmod non incididunt quis nulla enim voluptate voluptate occaecat adipisicing. Tempor consectetur dolor commodo quis nulla officia commodo non et laborum adipisicing reprehenderit fugiat reprehenderit. Sit magna ea est id excepteur voluptate non. Consequat consequat duis dolor proident ut cillum ullamco sint nostrud consectetur commodo cillum. Nostrud dolor qui eu ut ad reprehenderit aliqua laboris.',
    time: '10/10/2020',
  },
];

function MessageList() {
  return (
    <>
      {DATA.map((msg: any, idx: number) => {
        return (
          <MessageCard img={msg.img} username={msg.username} time={msg.time} body={msg.body} key={`message-${idx}`} />
        );
      })}
    </>
  );
}

export default MessageList;
