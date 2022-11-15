import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CustomerDetails = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './customer-information/customer-information') 
);
const MobileActivationDeactivation = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './mobile-activate-deactivate/mobile-activation-deact-report') 
);
const ApplicationAuditTrail = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './login-audit-trail/login-audit-report') 
);
const backofficeUserDetails = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './backoffice-users-detail/backoffice-user-report') 
);
const VirtualCardReports = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './virtual-card-report/virtual-card-report') 
);
const VirtualCardInfo = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './virtual-card-Info/virtual-card-info') 
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

const CustomerInformation = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/CustomerInformation`} />
      
         <Route
          path={`${match.url}/CustomerInformation`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={CustomerDetails}
        />
         <Route
          path={`${match.url}/ActivationDeactivation`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={MobileActivationDeactivation}
        />
         <Route
          path={`${match.url}/LoginAudit`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={ApplicationAuditTrail}
        />
         <Route
          path={`${match.url}/BackOfficeReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={backofficeUserDetails}
        />
         <Route
          path={`${match.url}/VirtualCardReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={VirtualCardReports}
        />
         <Route
          path={`${match.url}/GetVirtualCardInfo`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={VirtualCardInfo}
        />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default CustomerInformation;
