import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const SafTranasaction = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './SafTransaction/safTransaction') 
);
const MobileAppTransactions = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './mobile-app-transactions/mobile-app-transaction') 
);
const IncomingIBFT = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './IncomingIBFT/incomingIbft') 
);
const PayToCnic = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './paytocnic-transaction/pay-to-cnic-transactions') 
);
const MerchantTransaction = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './merchant-transaction/merchant-transactions') 
);
const YearlySummaryTransactions = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './yearly-transaction-report/yearly-transaction-report') 
);
const YearlyActivityTransactions = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './yearly-activity-report/yearly-activity-report') 
);
const MonthlySummaryTransactions = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './monthly-transaction-report/monthly-transaction-report') 
);
const MonthlyActivityTransactions = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './monthly-activity-report/monthly-activity-report') 
);
const DailyActivityTransactions = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './daily-activity-report/daily-Activity-report') 
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

const Transaction = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/SAFTransactionResult`} />
      
         <Route
          path={`${match.url}/SAFTransactionResult`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={SafTranasaction}
        />
         <Route
          path={`${match.url}/MobileAppTransactions`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={MobileAppTransactions}
        />
         <Route
          path={`${match.url}/IncomingIBFT`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={IncomingIBFT}
        />
         <Route
          path={`${match.url}/PaytoCnic`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={PayToCnic}
        />
         <Route
          path={`${match.url}/MerchantTransaction`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={MerchantTransaction}
        />
         <Route
          path={`${match.url}/YearlyTransactionReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={YearlySummaryTransactions}
        />
         <Route
          path={`${match.url}/YearlyActivityReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={YearlyActivityTransactions}
        />
         <Route
          path={`${match.url}/MonthlyTransactionReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={MonthlySummaryTransactions}
        />
         <Route
          path={`${match.url}/MonthlyActivityReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={MonthlyActivityTransactions}
        />
         <Route
          path={`${match.url}/DailyActivityReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={DailyActivityTransactions}
        />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Transaction;
