import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/esm/Image';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';

export interface CollaborationRequestProps {
  id: string;
  /** username prop documentation */
  username: string;
  /** document prop documentation */
  document: string;
  img?: string;
  onJoin: any;
  onLeave: any;
  isJoinLoading: boolean;
  isLeaveLoading: boolean;
}

const IMG_DEFAULT = 'user.png';

function CollaborationRequest(props: CollaborationRequestProps) {
  const { id, username, document, img, onJoin, onLeave, isJoinLoading, isLeaveLoading } = props;

  return (
    <Card className="mb-2">
      <Media className="p-2 align-items-stretch">
        <Image src={img ? img : IMG_DEFAULT} roundedCircle width={50} height={50} className="mr-2" />
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div>
            <Link to={`profile/${username}`} style={{ color: '#000000' }}>
              <h6 className="mb-0">{username}</h6>
            </Link>
            <Link to={`document/${id}`} style={{ color: '#000000' }}>
              <p className="mb-0 font-weight-light">{document}</p>
            </Link>
          </div>
          <ButtonGroup size="sm" aria-label="refuse">
            <Button variant="success" type="submit" onClick={onJoin} className="mr-2" disabled={isJoinLoading}>
              Accepter
            </Button>
            <Button variant="danger" type="submit" onClick={onLeave} disabled={isLeaveLoading}>
              Refuser
            </Button>
          </ButtonGroup>
        </Media.Body>
      </Media>
    </Card>
  );
}

export default CollaborationRequest;
