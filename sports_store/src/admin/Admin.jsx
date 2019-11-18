import React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { Route, Redirect, Switch } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import OrdersConnector from './orders/OrdersConnector';
import ToggleLink from '../components/ToggleLink';
import ProductConnector from './products/ProductConnector';
import ProductEditor from './products/ProductEditor';
import ProductCreator from './products/ProductCreator';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});
const graphQlClient = new ApolloClient({
  cache,
  link,
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

const Admin = () => (
  <ApolloProvider client={graphQlClient}>
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
        </div>
        <div className="col-9 p-2">
          <Switch>
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

export default Admin;
