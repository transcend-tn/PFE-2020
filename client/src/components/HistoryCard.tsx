import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Button from 'react-bootstrap/esm/Button';
import { BsClock } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';

export interface HistoryCardProps {
  username: string;
  timeEdit: string;
  document: string;
}

function HistoryCard(props: HistoryCardProps) {
  const onCopyHistory = () => {
    console.log('onCopyHistory');
  };

  return (
    <Media className="border">
      <Media.Body className="d-flex justify-content-between align-items-center p-2">
        <div>
          <span> {props.document} </span>
          <div className="d-flex flex-row flex-center font-weight-light">
            <span className="mr-2"> {props.username} </span>
            <span className="text-secondary">
              <BsClock size={12} color="#9E9E93" className="mr-1" />
              {props.timeEdit}
            </span>
          </div>
        </div>
        <Button variant="link">
          <MdContentCopy color="#33A2FF" onClick={onCopyHistory} />
        </Button>
      </Media.Body>
    </Media>
  );
}

export default HistoryCard;
