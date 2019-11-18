import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ProductsTable from './ProductsTable';
import { PRODUCTS_LIST } from '../clientQueries';
import { DELETE_PRODUCT } from '../clientMutations';

const variables = {
  page: 1, pageSize: 10, sort: 'id',
};

const ProductConnector = () => {
  const {
    data, loading, error, refetch,
  } = useQuery(PRODUCTS_LIST, {
    variables,
    errorPolicy: 'all',
    displayName: 'ProductConnectorQuery', /* Component's name to be displayed in React DevTools (def: Query) */
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    /**
     * Mutations that remove objects do not automatically update the local cached data. For
     * this type of mutation, an update function must be defined that modifies the cached data directly.
     * This will update the product list without needing to query the server
     */
    update(cache, { data: { deleteProduct: { id } } }) {
      const { products } = cache.readQuery({ query: PRODUCTS_LIST, variables });
      products.products = products.products.filter((p) => p.id !== id);
      products.totalSize -= 1;
      cache.writeQuery({ query: PRODUCTS_LIST, data: products });
    },
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

  const { products } = data;
  const theProps = {
    totalSize: products.totalSize,
    products: products.products,
    currentPage: variables.page,
    pageCount: Math.ceil(products.totalSize / variables.pageSize),
    navigateToPage: (page) => { variables.page = Number(page); refetch(variables); },
    pageSize: variables.pageSize,
    setPageSize: (size) => { variables.pageSize = Number(size); refetch(variables); },
    sortKey: variables.sort,
    setSortProperty: (key) => { variables.sort = key; refetch(variables); },
    deleteProduct,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ProductsTable {...theProps} />;
};

export default ProductConnector;
