import React from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import HistoryCard from './HistoryCard';

const DATA: any = [
  {
    username: 'Username 01',
    document: 'document 01',
    time: '10/10/2020',
  },
  {
    username: 'Username 02',
    document: 'document 02',
    time: '10/10/2020',
  },
  {
    username: 'Username 03',
    document: 'document 03',
    time: '10/10/2020',
  },
];

function HistoryList() {
  return (
    <ListGroup variant="flush">
      {DATA.map((msg: any) => {
        return (
          <ListGroup.Item>
            <HistoryCard document={msg.document} username={msg.username} time={msg.time} />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default HistoryList;
