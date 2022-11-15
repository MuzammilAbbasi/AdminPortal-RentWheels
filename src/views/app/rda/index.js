import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Repatriation = React.lazy(() =>
  import(/* webpackChunkName: "user" */ './repatriation/repatriation')
);

const IpsAccount = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './ips-account/ips-account') 
);

const Tbills = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './t-bills/t-bills') 
);

const PIBs = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './PIBs/pibs') 
);

const AccountMaintenance = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './account-maintenance/account-maintenance') 
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

const Rda = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/repatriation`} />
        <PermissionRoute
          path={`${match.url}/repatriation`}
          permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={Repatriation}
        />
        <PermissionRoute
          path={`${match.url}/ips-account`}
          permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={IpsAccount}
        />
        <PermissionRoute
          path={`${match.url}/t-bills`}
          permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={Tbills}
        />
        <PermissionRoute
          path={`${match.url}/pibs`}
          permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={PIBs}
        />
         <PermissionRoute
          path={`${match.url}/account-maintenance`}
          permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={AccountMaintenance}
        />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Rda;
