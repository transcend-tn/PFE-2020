import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/UserCard';
import { getUserByKeyword } from '../../services/user.service';
import { useQuery } from 'react-query';

const SearchPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const { status, data: users = [] } = useQuery(['user:getUserByKeyword', keyword], getUserByKeyword);
  // console.log(users)
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
          onFollow=""
          onUnfollow=""
          isFriend={true}
        />
      ))}
    </Card>
  );
};

export default SearchPage;
