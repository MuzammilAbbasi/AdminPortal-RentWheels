import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const VirtualCardAudit = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './virtualcardaudit/virtualcardaudit') 
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

const Registration = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/getVirtualCardAudit`} />
      
         <Route
          path={`${match.url}/getVirtualCardAudit`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={VirtualCardAudit}
        />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Registration;
