import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";
// import Transaction from './cnic-transaction';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./dashboard")
);

const UserManagement = React.lazy(() =>
  import(/* webpackChunkName: "user" */ "./user-management")
);

const Rda = React.lazy(() => import(/* webpackChunkName: "rda" */ "./rda"));

const Bookings = React.lazy(() => import("./bookings"));

const VehicleList = React.lazy(() => import("./vehicles"));

const AddVehicleCategory = React.lazy(() => import("./addvehicat"));

const Batch = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./analytics")
);
const MobileAppRegistration = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./registration")
);
const CustomerInformation = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./reports")
);
const VirtualCardInfo = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./virtual-card")
);
const CallCenter = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./call-center")
);
const BulkIbt = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./bulk-ibt")
);
const BulkIbft = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./bulk-ibft")
);
const CNIC = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./cnic-transaction")
);
const Transaction = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./transaction")
);

const NonFinancialTransaction = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./non-financial-transaction")
);

const Payout = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./Payout")
);
const Analytics = React.lazy(() =>
  import(/* webpackChunkName: "rda" */ "./analytics")
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Route
                path={`${match.url}/dashboard`}
                render={(props) => <Dashboard {...props} />}
              />
              <Route
                path={`${match.url}/user-management`}
                render={(props) => <UserManagement {...props} />}
              />
              <Route
                path={`${match.url}/bookings`}
                render={(props) => <Bookings {...props} />}
              />
              <Route
                path={`${match.url}/vehicles`}
                render={(props) => <VehicleList {...props} />}
              />
              <Route
                path={`${match.url}/addvehicat`}
                render={(props) => <AddVehicleCategory {...props} />}
              />
              <Route
                path={`${match.url}/rda`}
                render={(props) => <Rda {...props} />}
              />
              <Route
                path={`${match.url}/batch`}
                render={(props) => <Batch {...props} />}
              />
              <Route
                path={`${match.url}/registration`}
                render={(props) => <MobileAppRegistration {...props} />}
              />
              <Route
                path={`${match.url}/report`}
                render={(props) => <CustomerInformation {...props} />}
              />
              <Route
                path={`${match.url}/call-center`}
                render={(props) => <CallCenter {...props} />}
              />
              <Route
                path={`${match.url}/transaction`}
                render={(props) => <Transaction {...props} />}
              />
              <Route
                path={`${match.url}/NonFinancialTransactions`}
                render={(props) => <NonFinancialTransaction {...props} />}
              />
              <Route
                path={`${match.url}/bulk-ibt`}
                render={(props) => <BulkIbt {...props} />}
              />
              <Route
                path={`${match.url}/bulk-ibft`}
                render={(props) => <BulkIbft {...props} />}
              />
              <Route
                path={`${match.url}/cnic-transaction`}
                render={(props) => <CNIC {...props} />}
              />
              <Route
                path={`${match.url}/payout`}
                render={(props) => <Payout {...props} />}
              />
              <Route
                path={`${match.url}/GetVirtualCardInfo`}
                render={(props) => <VirtualCardInfo {...props} />}
              />
              <Route
                path={`${match.url}/Analytics`}
                render={(props) => <Analytics {...props} />}
              />

              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboard`}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
