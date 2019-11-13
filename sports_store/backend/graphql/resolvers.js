const resolvers = {
  Query: {
    product: (_, { id }, { dataSources }) => dataSources.productsAPI.getProduct(id),
    products: (_, args, { dataSources }) => dataSources.productsAPI.getProducts(args),
    categories: (_, __, { dataSources }) => dataSources.categoriesAPI.getCategories(),
  },
};

module.exports = resolvers;
