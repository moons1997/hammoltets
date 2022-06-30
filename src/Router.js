import React, { Suspense, lazy } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "./history";
import { Spin } from "antd";

const Default = lazy(() => import("./views/Default.jsx"));
const Home = lazy(() => import("./views/Home.jsx"));
const Product = lazy(() => import("./views/Product.jsx"));

const AppRoute = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <>
          <Suspense fallback={<Spin />}>
            <Component {...props} />
          </Suspense>
        </>
      );
    }}
  />
);

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* <AppRoute exact path="/">
            <Redirect to="/home" />
          </AppRoute> */}
          <AppRoute exact path="/" component={Home} />
          <AppRoute path="/product/:id" component={Product} />
          <AppRoute component={Default} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
