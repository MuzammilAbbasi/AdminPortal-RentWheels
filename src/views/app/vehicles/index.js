import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const VehicleList = React.lazy(() =>
  import(/* webpackChunkName: "bookings" */ "./getvehicles")
);

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

const VehicleListSc = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/getvehicles`} />
      <PermissionRoute
        path={`${match.url}/getvehicles`}
        // permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
        component={VehicleList}
      />
      {/* <Route
        path={`${match.url}/home`}
        render={props => <Home {...props} />}
      /> */}
      {/* <Redirect to="/error" /> */}
    </Switch>
  </Suspense>
);
export default VehicleListSc;
