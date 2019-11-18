import gql from 'graphql-tag';

export const SHIP_ORDER = gql`
  mutation($id: ID!, $shipped: Boolean!) {
    shipOrder(id: $id, shipped: $shipped) {
      id, shipped
    }
  }
`;

export const STORE_PRODUCT = gql`
  mutation($product: productStore) {
    storeProduct(product: $product) {
      id, name, category, description, price
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation($product: productUpdate) {
    updateProduct(product: $product) {
      id, name, category, description, price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
