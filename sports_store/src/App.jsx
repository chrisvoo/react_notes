import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import ShopConnector from './shop/ShopConnector';
import SportsStoreDataStore from './data/DataStore';
import Admin from './admin/Admin';

export default () => (
  <Provider store={SportsStoreDataStore}>
    <Router>
      <Switch>
        <Route path="/admin" exact component={Admin} />
        <Route path="/shop" component={ShopConnector} />
        <Redirect to="/shop" />
      </Switch>
    </Router>
  </Provider>
);
