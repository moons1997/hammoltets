import React, { lazy } from "react";
import Routerw from "./Router";
import { Router, Switch } from "react-router-dom";

import { history } from "./history";
import PrivateRoute from "./privateRouter";
import "./App.css";
const Header = lazy(() => import("./views/Header.jsx"));

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <Router history={history}>
        <Switch>
          {/* <Route path="/pages/login" component={Login} /> */}
          <PrivateRoute path="/" component={Routerw} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
