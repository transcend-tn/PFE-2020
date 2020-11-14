import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import routes from './routes';

import './styles/index.scss';


function App() {
  return (
    <ReactQueryCacheProvider >
      <Router>
        <Switch>
          {routes.map(({ path, Component }: any) => {
            return (
              <Route path={path} key={path} exact>
                <Component />
              </Route>
            );
          })}
        </Switch>
        <ToastContainer />
      </Router>
    </ReactQueryCacheProvider>
  );
}

export default App;