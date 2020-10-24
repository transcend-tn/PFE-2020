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
    <div style={{ maxWidth: 500 }}>
      <Media className="border mb-2 max-width-300">
        <Media.Body className="p-2">
          <span> {props.title} </span>
          <div className="d-flex flex-row font-weight-light">
            <span className="mr-2"> {props.username} </span>
            <span className="text-secondary">
              <BsClock size={12} color="#9E9E93" className="mr-1" />
              {props.time}
            </span>
          </div>
        </Media.Body>
      </Media>
    </div>
  );
}

export default PropositionCard;
