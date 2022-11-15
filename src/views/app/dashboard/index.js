import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Home = React.lazy(() => import(/* webpackChunkName: "home" */ "./home"));

const PermissionRoute = ({
  path: Path,
  permissions: Permissions,
  component: Component,
}) => {
  // const {firstLogin} = JSON.parse(sessionStorage.getItem("user"));
  return (
    <Route
      path={Path}
      render={(props) => {
        // const page = Permissions.filter(x => x.pageUrl === Path && !firstLogin);

        return <Component {...props} />;
        // if (page.length > 0) {
        //   return <Component {...props} />;
        // } else {
        //   return <Redirect to="/error" />;
        // }
      }}
    />
  );
};

const HomeMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
      <PermissionRoute
        path={`${match.url}/home`}
        // permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
        component={Home}
      />
      {/* <Route
        path={`${match.url}/home`}
        render={props => <Home {...props} />}
      /> */}
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default HomeMenu;
