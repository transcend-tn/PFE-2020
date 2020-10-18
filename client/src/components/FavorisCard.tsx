import React, { useState } from "react";
import Media from "react-bootstrap/esm/Media";
import { FaStar } from "react-icons/fa";

export interface FavorisCardProps {
  star?: boolean;
  timeEdit: string;
  document: string;
}

const favOn = "#f5bf42";
const favOff = "#808080";

function FavorisCard(props: FavorisCardProps) {
  const [color, setColor] = useState(props.star ? favOn : favOff);

  function toggleColor() {
    setColor(color === favOn ? favOff : favOn);
  }

  return (
    <Media>
      <Media.Body className="d-flex justify-content-between align-items-center">
        <div className="description">
          <h5 className="text-primary"> {props.document} </h5>
          <p className="text-secondary"> {props.timeEdit} </p>
        </div>
        <div className="action">
          <FaStar color={color} onClick={toggleColor} style={{ fontSize: 30 }} />
        </div>
      </Media.Body>
    </Media>
  );
}

export default FavorisCard;
