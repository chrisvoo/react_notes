const resolvers = {
  Query: {
    product: (_, { id }, { dataSources }) => dataSources.sportsAPI.getProduct(id),
    products: (_, args, { dataSources }) => dataSources.sportsAPI.getProducts(args),
    categories: (_, __, { dataSources }) => dataSources.sportsAPI.getCategories(),
    orders: (_, { onlyUnshipped }, { dataSources }) => dataSources.sportsAPI.getOrders(onlyUnshipped),
  },
  Mutation: {
    storeProduct: (_, { product }, { dataSources }) => dataSources.sportsAPI.storeProduct(product),
    updateProduct: (_, { product }, { dataSources }) => dataSources.sportsAPI.updateProduct(product),
    deleteProduct: (_, { id }, { dataSources }) => dataSources.sportsAPI.deleteProduct(id),
    shipOrder: (_, { id, shipped }, { dataSources }) => dataSources.sportsAPI.shipOrder(id, shipped),
  },
};

module.exports = resolvers;
