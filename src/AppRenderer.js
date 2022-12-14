import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import ErrorBoundary from "components/custom/error-boundary"

import "assets/css/common/common.css"

const App = React.lazy(() => import(/* webpackChunkName: "App" */'./App' ));

ReactDOM.render(
  <Provider store={configureStore()}>
    <Suspense fallback={<div className="loading" />}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);
/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
