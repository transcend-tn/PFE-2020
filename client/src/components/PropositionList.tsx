import React from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import HistoryCard from './HistoryCard';
import PropositionCard from './PropositionCard';

const DATA: any = [
  {
    username: 'Username 01',
    title: 'document 01',
    time: '10/10/2020',
  },
  {
    username: 'Username 02',
    title: 'document 02',
    time: '10/10/2020',
  },
  {
    username: 'Username 03',
    title: 'document 03',
    time: '10/10/2020',
  },
];

function PropositionList() {
  return (
    <>
      <ListGroup variant="flush">
        {DATA.map((msg: any) => {
          return (
            <ListGroup.Item>
              <PropositionCard title={msg.title} username={msg.username} time={msg.time} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}

export default PropositionList;
