import React, { useState } from 'react';
import Card from 'react-bootstrap/esm/Card';
import Media from 'react-bootstrap/esm/Media';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { DOCUMENT_BY_ID } from '../constants/uris';

export interface FavorisCardProps {
  id: string;
  star?: boolean;
  timeEdit: string;
  document: string;
}

const favOn = '#f5bf42';
const favOff = '#808080';

function FavorisCard(props: FavorisCardProps) {
  const { id, star, timeEdit, document } = props;
  const [color, setColor] = useState(star ? favOn : favOff);

  function toggleColor() {
    setColor(star ? favOn : favOff);
  }

  return (
    <Card className="mb-2">
      <Media className="p-2 align-items-stretch">
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div>
            <Link to={DOCUMENT_BY_ID(id)} style={{ color: '#000000' }}>
              <h6 className="mb-0"> {document} </h6>
            </Link>
            <p className="mb-0 font-weight-light" style={{  fontSize : "small" }}> {timeEdit} </p>
          </div>
          <FaStar color={color} onClick={toggleColor} style={{ fontSize: 25 }} />
        </Media.Body>
      </Media>
    </Card>
  );
}

export default FavorisCard;
