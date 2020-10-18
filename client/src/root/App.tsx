import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import routes from "./routes";

import "./styles/index.scss";

function App() {
  return (
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
  );
}

export default App;
