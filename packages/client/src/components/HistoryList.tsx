import React from 'react';
import HistoryCard from './HistoryCard';

export interface HistoryListProps {
  data: any;
}

function HistoryList(props: HistoryListProps) {
  const { data } = props;
  return (
    <div style={{ maxWidth: 500 }}>
      {data.map((snapshot: any, idx: number) => {
        return (
          <HistoryCard
            title={snapshot.title}
            body={snapshot.body}
            user={snapshot.user}
            time={snapshot.time}
            key={`history-${idx}`}
          />
        );
      })}
    </div>
  );
}

export default HistoryList;
