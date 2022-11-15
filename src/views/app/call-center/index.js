import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const callcenter = React.lazy(() =>
  import(/* webpackChunkName: "user" */ './call-center-maker/call-center')
);

const CallCenterSupervisor = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './call-center-supervisor/call-center-supervisor') 
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

const CallCenter = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/CallCenter`} />
      
         <Route
          path={`${match.url}/CallCenter`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={callcenter}
        />
         <Route
          path={`${match.url}/CallCenterSupervisor`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={CallCenterSupervisor}
        />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default CallCenter;
