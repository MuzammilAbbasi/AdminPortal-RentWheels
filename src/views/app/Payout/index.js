import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const PayoutTransaction = React.lazy(() =>
  import(/* webpackChunkName: "user" */ './payout/Payout')
);



const PermissionRoute = ({ path: Path, permissions: Permissions, component: Component }) => {
  return (
    <Route
      path={Path}
      render={props => {
        const page = Permissions.filter(x => x.pageUrl === Path);
        if (page.length > 0) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/error" />;
        }
      }
      }
    />
  );
}

const Payout = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/Payout`} />
      
         <Route
          path={`${match.url}/Payout`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={PayoutTransaction}
        />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Payout;
