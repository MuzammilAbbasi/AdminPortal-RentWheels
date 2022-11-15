import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DailyNonFinancialTransaction = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './daily-nonfinancial-transaction/daily-nonfinancial-transaction') 
);
const DailyRegistrationActivity = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './daily-registration-activity/daily-registration-activity') 
);
const MonthyNonFinancialTransaction = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './monthly-nonfinancial-transaction/monthly-nonfinancial-transaction') 
);
const MonthlyRegistrationActivity = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './monthly-registration-activity/monthy-registration-activity') 
);
const YearlyRegistrationActivity = React.lazy( () => 
  import(/* webpackChunkName: "user" */ './yearly-registration-activity/yearly-registration-activity') 
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

const NonFinancialTransaction = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/DailyActivityReport`} />
      
         <Route
          path={`${match.url}/DailyNonFinancialActivityReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={DailyNonFinancialTransaction}
        />
         <Route
          path={`${match.url}/DailyActivityReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={DailyRegistrationActivity}
        />
         <Route
          path={`${match.url}/MonthlyNonFinancialActivityReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={MonthyNonFinancialTransaction}
        />
         <Route
          path={`${match.url}/MonthlyActivityReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={MonthlyRegistrationActivity}
        />
         <Route
          path={`${match.url}/YearlySummaryReport`}
        //   permissions={JSON.parse(sessionStorage.getItem('user')).permissions}
          component={YearlyRegistrationActivity}
        />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default NonFinancialTransaction;
