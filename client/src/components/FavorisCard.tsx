import React, { useState } from 'react';
import Card from 'react-bootstrap/esm/Card';
import Media from 'react-bootstrap/esm/Media';
import { FaStar } from 'react-icons/fa';

export interface FavorisCardProps {
  star?: boolean;
  timeEdit: string;
  document: string;
}

const favOn = '#f5bf42';
const favOff = '#808080';

function FavorisCard(props: FavorisCardProps) {
  const [color, setColor] = useState(props.star ? favOn : favOff);

  function toggleColor() {
    setColor(color === favOn ? favOff : favOn);
  }

  return (
    <Card className="mb-2" style={{ width: '30rem' }}>
      <Media>
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div className="ml-3 mt-2 mb-2 mr-2">
            <h6 className="mb-0"> {props.document} </h6>
            <p className="mb-0 font-weight-light"> {props.timeEdit} </p>
          </div>
          <div className="action mr-3">
            <FaStar color={color} onClick={toggleColor} style={{ fontSize: 25 }} />
          </div>
        </Media.Body>
      </Media>
    </Card>
  );
}

export default FavorisCard;
