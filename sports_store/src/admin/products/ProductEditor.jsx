import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import ProductCreator from './ProductCreator';
import { GET_PRODUCT } from '../clientQueries';

const ProductEditor = (props) => {
  const { match } = props;
  /* The Query component allows GraphQL queries to be performed declaratively, with the results
   * and other client features presented through a render prop function */
  return (
    <Query query={GET_PRODUCT} variables={{ id: match.params.id }}>
      { ({ loading, data }) => {
        if (!loading) {
          return (
            <ProductCreator
              {...props}
              product={data.product}
              mode="edit"
            />
          );
        }
        return null;
      }}
    </Query>
  );
};

ProductEditor.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProductEditor;
