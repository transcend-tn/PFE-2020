import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/UserCard';
import { useStoreState } from '../../hooks/store.hooks';
import { getUserByKeyword } from '../../services/user.service';

const SearchPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const currentUser = useStoreState((state) => state.user.user);
  const { data: users = [] } = useQuery(['user:getUserByKeyword', keyword], getUserByKeyword);
  return (
    <Card className=" p-3">
      <h5>Search Page</h5>
      <p>keyword : {keyword}</p>
      {users.map((user: any, idx: number) => (
        <UserCard
          key={`user-${idx}`}
          fullName={`${user.fname} ${user.lname}`}
          username={user.username}
          userId={user.id}
          isFriend={user.followers.map((f: any) => f.id).includes(currentUser.id)}
          showBtn={user.id !== currentUser.id ? true : false}
        />
      ))}
    </Card>
  );
};

export default SearchPage;
