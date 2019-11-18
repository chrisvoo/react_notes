import gql from 'graphql-tag';

export const ORDERS_SUMMARY = gql`
  query($onlyShipped: Boolean, $page:Int, $pageSize:Int, $sort:String) {
    orders(onlyUnshipped: $onlyShipped) {
      totalSize,
      orders(page: $page, pageSize: $pageSize, sort: $sort) {
        id, name, email, shipped
        products {
          quantity, product { price }
        }
      }
    }
  }
`;

export const SHIP_ORDER = gql`
  mutation($id: ID!, $shipped: Boolean!) {
    shipOrder(id: $id, shipped: $shipped) {
      id, shipped
    }
  }
`;

export const PRODUCTS_LIST = gql`
  query($page: Int, $pageSize: Int, $sort: String) {
    products(page: $page, pageSize: $pageSize, sort: $sort) {
      totalSize,
      products(page: $page, pageSize: $pageSize, sort: $sort) {
        id, name, category, price
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query($id: ID!) {
    product(id: $id) {
      id, name, description, category, price
    }
  }
`;
