import React from 'react';
import Button from 'react-bootstrap/esm/Button';

import './styles/index.scss'

function App() {
  return (
    <div className="App">
      <Button variant="danger" className="mt-5 ml-5" >
        Hello world
      </Button>
      <hr/>
    </div>
  );
}

export default App;
