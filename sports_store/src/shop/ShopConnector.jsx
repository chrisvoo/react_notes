import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../data/ActionCreators';
import { DataTypes } from '../data/Types';
import Shop from './Shop';
import {
  addToCart, updateCartQuantity, removeFromCart, clearCart,
} from '../data/CartActionCreators';
import DataGetter from '../data/DataGetter';
import CartDetails from './CartDetails';

const ShopConnector = connect((dataStore) => ({ ...dataStore }), {
  loadData,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
})(
  class extends Component {
    componentDidMount() {
      const { loadData: load } = this.props;
      load(DataTypes.CATEGORIES);
    }

    render() {
      return (
        <Switch>
          <Redirect
            from="/shop/products/:category"
            to="/shop/products/:category/1"
            exact
          />
          <Route
            path="/shop/products/:category/:page"
            render={(routeProps) => (
              <DataGetter {...this.props} {...routeProps}>
                <Shop {...this.props} {...routeProps} />
              </DataGetter>
            )}
          />
          <Route
            path="/shop/cart"
            render={(routeProps) => <CartDetails {...this.props} {...routeProps} />}
          />
          <Redirect to="/shop/products/all/1" />
        </Switch>
      );
    }
  },
);

export default ShopConnector;
