import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import AuthProvider from './auth/AuthProvider';
import ShopConnector from './shop/ShopConnector';
import SportsStoreDataStore from './data/DataStore';

/**
 * To prevent them from downloading code that is unlikely to be used,
 * I have enabled lazy loading on the import statement that incorporates
 * the top-level administration component into the rest of the application.
 * This requires a Suspense fallback component to wrap the component to be lazy loaded.
 */
const Admin = lazy(() => import('./admin/Admin'));

export default () => (
  <Provider store={SportsStoreDataStore}>
    <AuthProvider>
      <Router>
        <Switch>
          <Route
            path="/admin"
            render={
              (routeProps) => (
                <Suspense fallback={<h3>Loading...</h3>}>
                  <Admin {...routeProps} />
                </Suspense>
              )
            }
          />
          <Route path="/shop" component={ShopConnector} />
          <Redirect to="/shop" />
        </Switch>
      </Router>
    </AuthProvider>
  </Provider>
);
