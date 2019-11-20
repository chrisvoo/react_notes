import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { Route, Redirect, Switch } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import OrdersConnector from './orders/OrdersConnector';
import ToggleLink from '../components/ToggleLink';
import ProductConnector from './products/ProductConnector';
import ProductEditor from './products/ProductEditor';
import ProductCreator from './products/ProductCreator';
import AuthPrompt from '../auth/AuthPrompt';
import AuthConsumer from '../auth/AuthConsumer';

class Admin extends Component {
  constructor(props) {
    super(props);

    if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
      throw new Error('REACT_APP_GRAPHQL_ENDPOINT env missing');
    }
  }

  render = () => {
    const { isAuthenticated, signout } = this.props;

    const { webToken } = this.props;

    const cache = new InMemoryCache();
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        authorization: webToken ? `Bearer ${webToken}` : '',
      },
    }));

    const httpLink = new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
      credentials: 'include',
    });

    this.client = new ApolloClient({
      cache,
      link: authLink.concat(httpLink),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all',
        },
      },
    });

    return (
      <ApolloProvider client={this.client}>
        <div className="container-fluid">
          <div className="row">
            <div className="col bg-info text-white">
              <div className="navbar-brand">SPORTS STORE</div>
            </div>
          </div>
          <div className="row">
            <div className="col-3 p-2">
              <ToggleLink to="/admin/orders">Orders</ToggleLink>
              <ToggleLink to="/admin/products">Products</ToggleLink>
              { isAuthenticated
                && (
                <button
                  type="button"
                  onClick={signout}
                  className="btn btn-block btn-secondary m-2 fixed-bottom col-3"
                >
                  Log Out
                </button>
                )}
            </div>
            <div className="col-9 p-2">
              <Switch>
                {
                  !isAuthenticated
                  && <Route component={AuthPrompt} />
                }
                <Route path="/admin/orders" component={OrdersConnector} />
                <Route
                  path="/admin/products/create"
                  component={ProductCreator}
                />
                <Route
                  path="/admin/products/:id"
                  component={ProductEditor}
                />
                <Route
                  path="/admin/products"
                  component={ProductConnector}
                />
                <Redirect to="/admin/orders" />
              </Switch>
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

Admin.defaultProps = {
  webToken: '',
  isAuthenticated: false,
};

Admin.propTypes = {
  webToken: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  signout: PropTypes.func.isRequired,
};

export default AuthConsumer(Admin);
