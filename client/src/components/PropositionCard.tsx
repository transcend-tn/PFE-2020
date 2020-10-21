import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import { Link } from 'react-router-dom';

export interface PropositionCardProps {
  titre: string;
  username: string;
  timeEdit: string;
}

function PropositionCard(props: PropositionCardProps) {
  return (
    <Media className="border mt-2">
      <Media.Body className="p-2">
        <Link to="proposition-modification">
          <span className="lead"> {props.titre} </span>
        </Link>
        <div className="d-flex flex-row mt-2">
          <Link to="favoris">
            <span className="mr-2 text-secondary"> {props.username} </span>
          </Link>
          <span className="text-secondary">{props.timeEdit}</span>
        </div>
      </Media.Body>
    </Media>
  );
}

export default PropositionCard;
