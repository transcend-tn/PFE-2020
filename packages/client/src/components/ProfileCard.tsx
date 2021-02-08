import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/esm/Card';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { USER_IMG } from '../constants/temp';
import Modal from 'react-bootstrap/esm/Modal';
import UserCard from './UserCard';
import { useStoreState } from '../hooks/store.hooks';
import { follow, getUserByUsername, unfollow } from '../services/user.service';
import { useMutation, useQuery, useQueryCache } from 'react-query';

export interface ProfileCardInterface {
  followers: number;
  following: number;
  user: any;
  canEdit: Boolean;
}

function ProfileCard(props: ProfileCardInterface) {
  const { user, followers, following, canEdit } = props;
  const cache = useQueryCache();
  const [followUser] = useMutation(follow, {
    onSuccess: () => cache.invalidateQueries('user:getUserByUsername'),
  });
  const [unfollowUser] = useMutation(unfollow, {
    onSuccess: () => cache.invalidateQueries('user:getUserByUsername'),
  });
  const currentUser = useStoreState((state) => state.user.user);
  const { data: current_user } = useQuery(['user:getUserByUsername', currentUser.username], getUserByUsername);
  const [followersShow, setfollowersShow] = useState(false);
  const [followingShow, setfollowingShow] = useState(false);
  const isFollowing = user.followers
    ? user.followers.map((u: any, idx: number) => u.username).includes(currentUser.username)
    : null;

  return (
    <>
      <Card>
        <Card.Body>
          <div className="text-center">
            <Image className="border" width={100} height={100} src={user.img ? user.img : USER_IMG} roundedCircle />

            <h5 className="text-center mt-2 mb-0">{`${user.fname} ${user.lname}`}</h5>
            <p className="text-muted mt-0">@{user.username}</p>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <div className="followers text-center mr-2">
              <h6 className="text-muted">Followers</h6>
              <h6 onClick={() => setfollowersShow(true)}>{followers}</h6>
            </div>

            <div className="text-center ml-2">
              <h6 className="text-muted">Following</h6>
              <h6 onClick={() => setfollowingShow(true)}>{following}</h6>
            </div>
          </div>

          {canEdit ? (
            <div className="text-center mt-4">
              <Link to={`/profile/${user.username}/edit`}>
                <Button className="btn-sm" variant="light" type="submit">
                  Editer Profile
                </Button>
              </Link>
            </div>
          ) : isFollowing ? (
            <div className="text-center mt-4">
              <Button className="btn-sm" variant="outline-danger" type="submit" onClick={() => unfollowUser(user.id)}>
                Unfollow
              </Button>
            </div>
          ) : (
            <div className="text-center mt-4">
              <Button className="btn-sm" variant="outline-secondary" type="submit" onClick={() => followUser(user.id)}>
                Follow
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
      <Modal size="sm" show={followersShow} onHide={() => setfollowersShow(false)} aria-labelledby="followers" centered>
        <Modal.Header closeButton>
          <Modal.Title id="followers">Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user.followers !== undefined &&
            user.followers.map((u: any, idx: number) => (
              <UserCard
                key={`u-${idx}`}
                fullName={`${u.fname} ${u.lname}`}
                username={u.username}
                userId={u.id}
                isFriend={current_user ? current_user.following.map((f: any) => f.id).includes(u.id) : null}
                showBtn={currentUser.id !== u.id ? true : false}
              />
            ))}
        </Modal.Body>
      </Modal>

      <Modal size="sm" show={followingShow} onHide={() => setfollowingShow(false)} aria-labelledby="following" centered>
        <Modal.Header closeButton>
          <Modal.Title id="following">Following</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user.following !== undefined &&
            user.following.map((u: any, idx: number) => (
              <UserCard
                key={`u-${idx}`}
                fullName={`${u.fname} ${u.lname}`}
                username={u.username}
                userId={u.id}
                isFriend={current_user ? current_user.following.map((f: any) => f.id).includes(u.id) : null}
                showBtn={currentUser.id !== u.id ? true : false}
              />
            ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileCard;
