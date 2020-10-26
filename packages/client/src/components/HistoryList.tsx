import React from 'react';
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
    <div style={{ maxWidth: 500 }}>
      {DATA.map((msg: any, idx: number) => {
        return <HistoryCard document={msg.document} username={msg.username} time={msg.time} key={`history-${idx}`} />;
      })}
    </div>
  );
}

export default HistoryList;
