import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Booking = React.lazy(() =>
  import(/* webpackChunkName: "bookings" */ "./booking")
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

const BookingMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/booking`} />
      <PermissionRoute
        path={`${match.url}/booking`}
        // permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
        component={Booking}
      />
      {/* <Route
        path={`${match.url}/home`}
        render={props => <Home {...props} />}
      /> */}
      {/* <Redirect to="/error" /> */}
    </Switch>
  </Suspense>
);
export default BookingMenu;
