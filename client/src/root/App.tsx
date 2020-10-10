import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import './styles/index.scss'

function App() {

  return (
    <Router>
      <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
