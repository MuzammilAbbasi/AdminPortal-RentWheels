import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const BatchPage = React.lazy(() =>
  import(/* webpackChunkName: "user" */ "../batch/Batch-Details/batch-details")
);
const ReconPage = React.lazy(() =>
  import(/* webpackChunkName: "user" */ "../batch/recon/Recon")
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

const Batch = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/batch`} />
      <Route
        path={`${match.url}/batch`}
        permissions={JSON.parse(sessionStorage.getItem("user")).permissions}
        component={BatchPage}
      />

      <Route
        path={`${match.url}/reconciliation`}
        permissions={JSON.parse(sessionStorage.getItem("user")).permissions}
        component={ReconPage}
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
export default Batch;
