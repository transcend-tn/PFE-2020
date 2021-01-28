import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/esm/Image';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';

export interface UserCardProps {
  fullName: string;
  username: string;
  img?: string;
  userId?: string;
  onFollow: any;
  onUnfollow: any;
  isFriend: boolean;
}

const IMG_DEFAULT = '/user.png';

function UserCard(props: UserCardProps) {
  const { userId, fullName, username, img, onFollow, onUnfollow, isFriend } = props;

  return (
    <Card className="mb-2">
      <Media className="p-2 align-items-stretch">
        <Image src={img ? img : IMG_DEFAULT} roundedCircle width={50} height={50} className="mr-2" />
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div>
            <Link to={`/profile/${username}`} style={{ color: '#000000' }}>
              <h6 className="mb-0">{fullName}</h6>
            </Link>
            <p className="mb-0 font-weight-light">@{username}</p>
          </div>
          <ButtonGroup size="sm" aria-label="refuse">
            <Button
              variant={isFriend ? 'secondary' : 'outline-secondary'}
              type="submit"
              onClick={isFriend ? () => onUnfollow({ userId }) : () => onFollow({ userId })}
              className="mr-2"
            >
              {isFriend ? 'Following' : 'Follow'}
            </Button>
          </ButtonGroup>
        </Media.Body>
      </Media>
    </Card>
  );
}

export default UserCard;
