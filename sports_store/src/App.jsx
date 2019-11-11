import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import ShopConnector from './shop/ShopConnector';
import SportsStoreDataStore from './data/DataStore';

export default class App extends Component {
    render = () => (
      <Provider store={SportsStoreDataStore}>
        <Router>
          <Switch>
            <Route path="/shop" component={ShopConnector} />
            <Redirect to="/shop" />
          </Switch>
        </Router>
      </Provider>
    )
}
