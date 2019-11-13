const { DataSource } = require('apollo-datasource');

/**
 * Here are some of the core concepts for creating your own data source:
 * `initialize` method: implement this method if you want to pass in any configuration options to your class.
 * this.context: A graph API's context is an object that's shared among every resolver in a GraphQL request,
 *  useful for storing user information.
 * Caching: the generic data source does not have any built in cache system.
 *
 * @see https://www.apollographql.com/docs/apollo-server/data/data-sources/#using-memcachedredis-as-a-cache-storage-backend
 */
class CategoriesDataSource extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  getCategories() {
    return this.store.get('categories').value();
  }
}

module.exports = CategoriesDataSource;
