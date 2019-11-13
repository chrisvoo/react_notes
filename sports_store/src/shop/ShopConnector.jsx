import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as shopActions from '../data/ActionCreators';
import * as cartActions from '../data/CartActionCreators';
import { DataTypes } from '../data/Types';
import Shop from './Shop';
import DataGetter from '../data/DataGetter';
import CartDetails from './CartDetails';
import Checkout from './Checkout';
import Thanks from './Thanks';

class ShopConnector extends Component {
  componentDidMount() {
    const { loadData } = this.props;
    loadData(DataTypes.CATEGORIES);
  }

  selectComponent = (routeProps) => {
    const wrap = (AComponent, Content) => (
      <AComponent {...this.props} {...routeProps}>
        { Content && wrap(Content)}
      </AComponent>
    );
    switch (routeProps.match.params.section) {
      case 'products':
        return wrap(DataGetter, Shop);
      case 'cart':
        return wrap(CartDetails);
      case 'checkout':
        return wrap(Checkout);
      case 'thanks':
        return wrap(Thanks);
      default:
        return <Redirect to="/shop/products/all/1" />;
    }
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
          path="/shop/:section?/:category?/:page?"
          render={(routeProps) => this.selectComponent(routeProps)}
        />
      </Switch>
    );
  }
}

ShopConnector.propTypes = {
  loadData: PropTypes.func.isRequired,
};

const mapDispatchToProps = { ...shopActions, ...cartActions };
const Connector = connect((dataStore) => dataStore, mapDispatchToProps)(ShopConnector);

export default Connector;
