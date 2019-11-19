import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import AuthProvider from './auth/AuthProvider';
import ShopConnector from './shop/ShopConnector';
import SportsStoreDataStore from './data/DataStore';
import Admin from './admin/Admin';

export default () => (
  <Provider store={SportsStoreDataStore}>
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/shop" component={ShopConnector} />
          <Redirect to="/shop" />
        </Switch>
      </Router>
    </AuthProvider>
  </Provider>
);
