import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const AnalyticsPage = React.lazy(() =>
  import(/* webpackChunkName: "user" */ "./analytics")
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
        const page = Permissions.filter((x) => x.pageUrl === Path);
        if (page.length > 0) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/error" />;
        }
      }}
    />
  );
};

const Analytics = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/analytics`} />
      <Route
        path={`${match.url}/analytics`}
        // permissions={JSON.parse(sessionStorage.getItem("user")).permissions}
        component={AnalyticsPage}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
// const Recon = ({ match }) => (
//   <Suspense fallback={<div className="loading" />}>
//     <Switch>
//       <Redirect exact from={`${match.url}/`} to={`${match.url}/recon`} />
//         <Route
//           path={`${match.url}/recon`}
//           permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
//           component={ReconPage}
//         />

//       <Redirect to="/error" />
//     </Switch>
//   </Suspense>
export default Analytics;
