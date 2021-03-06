import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Media from 'react-bootstrap/esm/Media';
import { FaStar } from 'react-icons/fa';
import { MutateFunction } from 'react-query';
import { Link } from 'react-router-dom';
import { DOCUMENT_BY_ID } from '../constants/uris';

export interface FavorisCardProps {
  id: string;
  showStar: boolean;
  active?: boolean;
  timeEdit: string;
  documenTitle: string;
  onAdd?: MutateFunction<string, unknown, any, unknown>;
  onRemove?: MutateFunction<string, unknown, any, unknown>;
  isAddLoading?: boolean;
  isRemoveLoading?: boolean;
}

const favOn = '#f5bf42';
const favOff = '#808080';

function FavorisCard(props: FavorisCardProps) {
  const { id, showStar, active, timeEdit, documenTitle, onAdd, onRemove } = props;

  const toggleFavoris = () => {
    if (active) {
      onRemove && onRemove({ id });
    } else {
      onAdd && onAdd({ id });
    }
  };

  return (
    <Card className="mb-2">
      <Media className="p-2 align-items-stretch">
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div>
            <Link to={DOCUMENT_BY_ID(id)} style={{ color: '#000000' }}>
              <h6 className="mb-0"> {documenTitle} </h6>
            </Link>
            <p className="mb-0 font-weight-light" style={{ fontSize: 'small' }}>
              {' '}
              {timeEdit}{' '}
            </p>
          </div>
          {showStar && <FaStar color={active ? favOn : favOff} onClick={toggleFavoris} style={{ fontSize: 25 }} />}
        </Media.Body>
      </Media>
    </Card>
  );
}

export default FavorisCard;
