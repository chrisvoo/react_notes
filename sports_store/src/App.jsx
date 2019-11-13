import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import ShopConnector from './shop/ShopConnector';
import SportsStoreDataStore from './data/DataStore';

export default () => (
  <Provider store={SportsStoreDataStore}>
    <Router>
      <Switch>
        <Route path="/shop" component={ShopConnector} />
        <Redirect to="/shop" />
      </Switch>
    </Router>
  </Provider>
);
