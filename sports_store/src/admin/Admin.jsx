import React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import OrdersConnector from './OrdersConnector';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});
const graphQlClient = new ApolloClient({
  cache,
  link,
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
        <div className="col p-2">
          <OrdersConnector />
        </div>
      </div>
    </div>
  </ApolloProvider>
);

export default Admin;
