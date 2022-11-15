import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const User = React.lazy(() =>
  import(/* webpackChunkName: "user" */ './user/user')
);

const Role = React.lazy(() =>
  import(/* webpackChunkName: "role" */ './role/role')
);

const Inbox = React.lazy(() =>
  import(/* webpackChunkName: "user" */ './inbox/inbox')
);

const Institution = React.lazy(() =>
  import(/* webpackChunkName: "role" */ './institution/institution')
);

const PermissionRoute = ({ path: Path, permissions: Permissions, component: Component }) => {
  const {firstLogin} = JSON.parse(sessionStorage.getItem("user"));
  return (
    <Route
      path={Path}
      render={props => {
        const page = Permissions.filter(x => x.pageUrl === Path && !firstLogin);
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

const UserMenu = ({ match }) => (

  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/user-management`} />
      <PermissionRoute
        path={`${match.url}/institution`}
        permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
        component={Institution}
      />
      <PermissionRoute
        path={`${match.url}/role`}
        permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
        component={Role}
      />
      <PermissionRoute
        path={`${match.url}/user`}
        permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
        component={User}
      />
      <PermissionRoute
        path={`${match.url}/inbox`}
        permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
        component={Inbox}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default UserMenu;
