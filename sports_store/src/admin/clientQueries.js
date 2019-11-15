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
