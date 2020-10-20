import React, { useState } from 'react';
import Media from 'react-bootstrap/esm/Media';
import Button from 'react-bootstrap/esm/Button';
import { BsClock } from 'react-icons/bs';
import { Card } from 'react-bootstrap';
import { MdContentCopy } from 'react-icons/md';

export interface HistoryCardProps {
  username: string;
  timeEdit: string;
  document: string;
}

function HistoryCard(props: HistoryCardProps) {
  return (
    <Card className="mb-2" style={{ width: '30rem' }}>
      <Media>
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div className="ml-3 mt-2 mb-2 mr-2">
            <h6 className="mb-0"> {props.document} </h6>
            <div className="d-flex flex-row">
              <p className="mb-0 font-weight-light"> {props.username} </p>
              <BsClock className="ml-2 mt-2" size={12} color="#9E9E93" />
              <p className="mb-0 font-weight-light ml-2 mt-1" style={{ fontSize: 12, color: '#9E9E93' }}>
                {' '}
                {props.timeEdit}{' '}
              </p>
            </div>
          </div>
          <div className="action mr-3">
            <MdContentCopy color="#33A2FF" onClick={console.log(props.document)} />
          </div>
        </Media.Body>
      </Media>
    </Card>
  );
}

export default HistoryCard;
