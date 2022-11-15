import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ChangePasswordLayout from "../../layout/ChangePasswordLayout"


const ChangePassword= React.lazy(() =>
  import('./change-password/ChangePassword')
);

const Form= React.lazy(() =>
  import('./change-password/NewForm')
);


const UserOperations = (props) => {
  
  return (

  <ChangePasswordLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>

          <Route
            path={`${props.match.url}/changepassword`}
            render={props => <ChangePassword {...props} />}
          />

          {/* <Route
            path={`${props.match.url}/newForm`}
            render={props => <Form {...props} />}
          /> */}

         <Redirect to= {`${props.match.url}/changepassword`} />

        </Switch>
      </Suspense>
    </ChangePasswordLayout>
    
  )};

  export default UserOperations;
