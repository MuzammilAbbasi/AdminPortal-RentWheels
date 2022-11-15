import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MerchantInformation = React.lazy(() =>
  import(/* webpackChunkName: "user" */ './merchant')
);



// const PermissionRoute = ({ path: Path, permissions: Permissions, component: Component }) => {
//   console.log("PermissionRoute",{Path,Permissions});
//   return (
//     <Route
//       path={Path}
//       render={props => {
//         const page = Permissions.filter(x => x.pageUrl === Path);
//         if (page.length > 0) {
//           return <Component {...props} />;
//         } else {
//           return <Redirect to="/error" />;
//         }
//       }
//       }
//     />
//   );
// }

const Transaction = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/CnicTransaction`} />
      
         <PermissionRoute
          path={`${match.url}/CnicTransaction`}
          permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={CnicTransaction}
        />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Transaction;
