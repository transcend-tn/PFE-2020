import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Card from 'react-bootstrap/esm/Card';
import Image from 'react-bootstrap/esm/Image';
import Media from 'react-bootstrap/esm/Media';
import { Link } from 'react-router-dom';

export interface CollaborationRequestProps {
  fullName?: string;
  username: string;
  img?: string;
  docId?: string;
  userId?: string;
  onAccept: any;
  onRefuse: any;
  isAcceptLoading: boolean;
  isRefuseLoading: boolean;
}

const IMG_DEFAULT = 'user.png';

function CollaborationRequest(props: CollaborationRequestProps) {
  const { fullName, docId, userId, username, img, onAccept, onRefuse, isAcceptLoading, isRefuseLoading } = props;

  return (
    <Card className="mb-2">
      <Media className="p-2 align-items-stretch">
        <Image src={img ? img : IMG_DEFAULT} roundedCircle width={50} height={50} className="mr-2" />
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div>
            <Link to={`profile/${username}`} style={{ color: '#000000' }}>
              <h6 className="mb-0">{fullName}</h6>
            </Link>
            <p className="mb-0 font-weight-light">@{username}</p>
          </div>
          <ButtonGroup size="sm" aria-label="refuse">
            <Button
              variant="success"
              type="submit"
              onClick={() => onAccept({ docId, userId })}
              className="mr-2"
              disabled={isAcceptLoading}
            >
              Accepter
            </Button>
            <Button
              variant="danger"
              type="submit"
              onClick={() => onRefuse({ docId, userId })}
              disabled={isRefuseLoading}
            >
              Refuser
            </Button>
          </ButtonGroup>
        </Media.Body>
      </Media>
    </Card>
  );
}

export default CollaborationRequest;
