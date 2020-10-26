import React from 'react';
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
      {DATA.map((msg: any, idx: number) => {
        return <PropositionCard title={msg.title} username={msg.username} time={msg.time} key={`proposition-${idx}`} />;
      })}
    </>
  );
}

export default PropositionList;
