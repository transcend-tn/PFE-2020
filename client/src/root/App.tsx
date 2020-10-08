import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';

import { useStoreActions, useStoreState } from '../hooks/store.hooks';

import './styles/index.scss'

function App() {
  const fetchUsers = useStoreActions(state => state.users.fetchUsers);
  const users = useStoreState(state => state.users.items);

  return (
    <div className="App">
      <Button variant="danger" className="mt-5 ml-5" onClick={() => fetchUsers()} >
        GET
      </Button>
      <hr/>
      <div className="d-flex flex-wrap justify-content-center">
        {
          users.map((user: any) => {
            return (
              <Card className="mr-3 mb-3 w-25" key={`user-${user.id}`}>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Button variant="primary" className="mt-3">Detail</Button>
                </Card.Body>
              </Card>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
