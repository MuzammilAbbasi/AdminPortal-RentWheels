import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AVC = React.lazy(() =>
  import(/* webpackChunkName: "bookings" */ "./addvehiclecategory")
);

const PermissionRoute = ({
  path: Path,
  permissions: Permissions,
  component: Component,
}) => {
  return (
    <Route
      path={Path}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

const AVCMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/addvehcilecategory`}
      />
      <PermissionRoute
        path={`${match.url}/addvehcilecategory`}
        // permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
        component={AVC}
      />
      {/* <Route
        path={`${match.url}/home`}
        render={props => <Home {...props} />}
      /> */}
      {/* <Redirect to="/error" /> */}
    </Switch>
  </Suspense>
);
export default AVCMenu;
