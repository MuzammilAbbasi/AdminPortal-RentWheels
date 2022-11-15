import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const bulkFundTrasferInit = React.lazy(() =>
  import(/* webpackChunkName: "user" */ './bulk-fund-transaction-initialize/bulk-fund-transaction-initialize')
);

const bulkFundTrasferPay = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './bulk-fund-transfer-transaction-pay/bulk-fund-transaction-pay') 
);
const bulkFundListOfFile = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './bulkfundtransferfiles/bulkfundtransferfiles')
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

const BulkIbt = ({ match }) => (
    
  <Suspense fallback={<div className="loading" />}>
    {console.log(match.url.substring(0,4), "BulkIBtmatch")}
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/fund-transfer-transactions`} />
      
         <Route
          path={`${match.url}/fund-transfer-transactions`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={bulkFundTrasferInit}
          exact
        />
         <Route
          path={`${match.url}/supervisor-payment`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={bulkFundTrasferPay}
          exact
        />
         <Route
          path={`${match.url}/BulkFundTransferTransactions/listOfUploadedFiles`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={bulkFundListOfFile}
          exact
        />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default BulkIbt;