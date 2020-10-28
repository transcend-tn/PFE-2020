import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { useQuery } from 'react-query';
import ProfileCard from '../../../components/ProfileCard';
import { useStoreState } from '../../../hooks/store.hooks';
import { getUserById } from '../../../services/user.service';

function ProfileCardContainer() {
  const user = useStoreState((state) => state.user.user);

  const { isLoading, isError, data = {}, error } = useQuery(user.id, getUserById);
  console.log('data: ', data);

  if (isError) {
    return <span>Error: {error} !</span>;
  }

  return (
    <>
      <ReactPlaceholder ready={!isLoading} showLoadingAnimation firstLaunchOnly>
        <ProfileCard followers={15} following={42} username={user.username} />
      </ReactPlaceholder>
    </>
  );
}

export default ProfileCardContainer;