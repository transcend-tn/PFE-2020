import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import routes from './routes';

import './styles/index.scss';

const queryCache = new QueryCache();

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
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
      </Router>
    </ReactQueryCacheProvider>
  );
}

export default App;
