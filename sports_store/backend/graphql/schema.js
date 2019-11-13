const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type product {
    # The ID scalar type represents a unique identifier, often used to 
    # refetch an object or as the key for a cache. The ID type is serialized
    # in the same way as a String; however, defining it as an ID signifies
    # that it is not intended to be human‐readable.
    id: ID!
    name: String!
    description: String!
    category: String!
    price: Float!
  }

  type productPage {
    totalSize: Int!
    products(sort: String, page: Int, pageSize: Int): [product]
  }

  type orderPage {
    totalSize: Int,
    orders(sort: String, page: Int, pageSize: Int): [order]
  }

  type order {
      id: ID!
      name: String!
      email: String!
      address: String!
      city: String!
      zip: String!
      country: String!
      shipped: Boolean
      products: [productSelection]
  }

  type productSelection {
    quantity: Int!,
    product: product 
  }

  type Query {
      product(id: ID!): product
      products(category: String, sort: String, page: Int, pageSize: Int): productPage
      categories: [String]
      orders(onlyUnshipped: Boolean): orderPage
  }

  input productStore {
      name: String!
      description: String!
      category: String!
      price: Float!
  }

  input productUpdate {
      id: ID!
      name: String
      description: String
      category: String
      price: Float
  }

  type Mutation {
      storeProduct(product: productStore): product
      updateProduct(product: productUpdate): product
      deleteProduct(id: ID!): product
      shipOrder(id: ID!, shipped: Boolean!): order
  }
`;

module.exports = typeDefs;
