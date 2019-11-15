import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import OrdersTable from './OrdersTable';
import { ORDERS_SUMMARY } from './clientQueries';

const variables = {
  onlyShipped: false, page: 1, pageSize: 10, sort: 'id',
};

const OrderConnector = () => {
  const {
    data, loading, error, refetch,
  } = useQuery(ORDERS_SUMMARY, {
    variables,
    errorPolicy: 'all',
    displayName: 'OrderConnectorQuery', /* Component's name to be displayed in React DevTools (def: Query) */
  });

  if (loading) return 'Loading..';
  if (error) {
    const { graphQLErrors, networkError } = error;
    if (graphQLErrors && graphQLErrors[0]) {
      const { message } = graphQLErrors[0];
      return message;
    }

    if (networkError) {
      switch (networkError.statusCode) {
        case 404: return `HTTP 404: ${process.env.REACT_APP_GRAPHQL_ENDPOINT} not reachable`;
        default: return networkError;
      }
    }
    return <p>ERROR</p>;
  }

  const { orders } = data;
  const theProps = {
    totalSize: orders.totalSize,
    orders: orders.orders,
    currentPage: variables.page,
    pageCount: Math.ceil(orders.totalSize / variables.pageSize),
    navigateToPage: (page) => {
      variables.page = Number(page);
      refetch(variables);
    },
    pageSize: variables.pageSize,
    setPageSize: (size) => {
      variables.pageSize = Number(size);
      refetch(variables);
    },
    sortKey: variables.sort,
    setSortProperty: (key) => {
      variables.sort = key;
      refetch(variables);
    },
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <OrdersTable {...theProps} />;
};

export default OrderConnector;
