import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import { BsClock } from 'react-icons/bs';

export interface PropositionCardProps {
  title: string;
  username: string;
  time: string;
}

function PropositionCard(props: PropositionCardProps) {
  return (
    <Media className="border">
      <Media.Body className="d-flex justify-content-between align-items-center p-2">
        <div>
          <span> {props.title} </span>
          <div className="d-flex flex-row flex-center font-weight-light">
            <span className="mr-2"> {props.username} </span>
            <span className="text-secondary">
              <BsClock size={12} color="#9E9E93" className="mr-1" />
              {props.time}
            </span>
          </div>
        </div>
      </Media.Body>
    </Media>
  );
}

export default PropositionCard;
