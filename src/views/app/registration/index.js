import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MobileAppRegistration = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './mobile-app-registration/mobile-app-resgistration') 
);
const SelfRegistration = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './self-registration/self-registration') 
);
const SelfRegistrationSuperviso = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './self-registration-supervisor/self-registration-supervisor') 
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
      <Redirect exact from={`${match.url}/`} to={`${match.url}/MobileAppRegistration`} />
      
         <Route
          path={`${match.url}/MobileAppRegistration`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={MobileAppRegistration}
        />
         <Route
          path={`${match.url}/SelfRegistration`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={SelfRegistration}
        />
         <Route
          path={`${match.url}/SelfRegistrationSupervisor`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={SelfRegistrationSuperviso}
        />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Registration;
