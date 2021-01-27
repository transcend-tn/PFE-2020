import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { useQuery } from 'react-query';
import ProfileCard from '../../../components/ProfileCard';
import { useStoreState } from '../../../hooks/store.hooks';
import { getUserByUsername } from '../../../services/user.service';

export interface ProfileCardProps {
  username: string;
}

function ProfileCardContainer(props: ProfileCardProps) {
  const { username } = props;
  const currentUsername = useStoreState((state) => state.user.user.username);
  const { isLoading, isError, data = {}, error } = useQuery(['user:getUserByUsername', username], getUserByUsername);
  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      <ReactPlaceholder ready={!isLoading} showLoadingAnimation firstLaunchOnly>
        <ProfileCard followers={15} following={42} user={data} canEdit={username === currentUsername} />
      </ReactPlaceholder>
    </>
  );
}

export default ProfileCardContainer;
