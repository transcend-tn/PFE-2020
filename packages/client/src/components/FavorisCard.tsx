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
    <Card className="mb-2">
      <Media className="p-2 align-items-stretch">
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-0"> {props.document} </h6>
            <p className="mb-0 font-weight-light"> {props.timeEdit} </p>
          </div>
          <FaStar color={color} onClick={toggleColor} style={{ fontSize: 25 }} />
        </Media.Body>
      </Media>
    </Card>
  );
}

export default FavorisCard;
