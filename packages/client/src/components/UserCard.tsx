import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/esm/Image';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';
import { useMutation, useQueryCache } from 'react-query';
import { follow, unfollow } from '../services/user.service';

export interface UserCardProps {
  fullName: string;
  username: string;
  img?: string;
  userId?: string;
  isFriend: boolean;
  showBtn?: boolean;
}

const IMG_DEFAULT = '/user.png';

function UserCard(props: UserCardProps) {
  const { userId, fullName, username, img, isFriend, showBtn } = props;
  const cache = useQueryCache();
  const [followUser] = useMutation(follow, {
    onSuccess: () => {
      cache.invalidateQueries('user:getUserByUsername');
      cache.invalidateQueries('user:getUserByKeyword');
    },
  });
  const [unfollowUser] = useMutation(unfollow, {
    onSuccess: () => {
      cache.invalidateQueries('user:getUserByUsername');
      cache.invalidateQueries('user:getUserByKeyword');
    },
  });
  return (
    <Card className="mb-2">
      <Media className="p-2 align-items-stretch">
        <Image src={img ? img : IMG_DEFAULT} roundedCircle width={50} height={50} className="mr-2" />
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div>
            <Link to={`/profile/${username}`} style={{ color: '#000000' }} data-dismiss="modal">
              <h6 className="mb-0">{fullName}</h6>
            </Link>
            <p className="mb-0 font-weight-light">@{username}</p>
          </div>
          <ButtonGroup size="sm" aria-label="refuse">
            {showBtn === true ? (
              <Button
                size="sm"
                variant={isFriend ? 'outline-danger' : 'outline-secondary'}
                type="submit"
                onClick={isFriend ? () => unfollowUser(userId) : () => followUser(userId)}
                className="mr-2"
              >
                {isFriend ? 'Unfollow' : 'Follow'}
              </Button>
            ) : null}
          </ButtonGroup>
        </Media.Body>
      </Media>
    </Card>
  );
}

export default UserCard;
