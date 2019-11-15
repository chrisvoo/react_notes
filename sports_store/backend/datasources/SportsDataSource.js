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
class SportsDataSource extends DataSource {
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

  // eslint-disable-next-line class-methods-use-this
  paginateQuery(query, page = 1, pageSize = 5) {
    return query.drop((page - 1) * pageSize).take(pageSize);
  }

  getProduct(id) {
    return this.store.get('products').getById(id).value();
  }

  getProducts(args) {
    const {
      category, sort, page, pageSize,
    } = args;

    return {
      totalSize: () => this.store.get('products')
        .filter((p) => (category ? new RegExp(category, 'i').test(p.category) : p))
        .size().value(),
      products: () => {
        let query = this.store.get('products');
        if (category) {
          query = query.filter((item) => new RegExp(category, 'i').test(item.category));
        }
        if (sort) { query = query.orderBy(sort); }
        return this.paginateQuery(query, page, pageSize).value();
      },
    };
  }

  getCategories() {
    return this.store.get('categories').value();
  }

  getOrders(onlyUnshipped) {
    return {
      totalSize: () => this.store.get('orders')
        .filter((o) => (onlyUnshipped ? o.shipped === false : o))
        .size().value(),
      orders: ({ sort, page, pageSize }) => {
        let query = this.store.get('orders');
        if (onlyUnshipped) { query = query.filter({ shipped: false }); }
        if (sort) { query = query.orderBy(sort); }
        return this.paginateQuery(query, page, pageSize).value()
          .map((order) => ({
            ...order,
            products: () => (products) => products.map((p) => ({
              quantity: p.quantity,
              product: this.getProduct(p.product_id),
            })),
          }));
      },
    };
  }

  storeProduct(product) {
    return this.store.get('products').insert(product).value();
  }

  updateProduct(product) {
    return this.store.get('products').updateById(product.id, product).value();
  }

  deleteProduct(id) {
    return this.store.get('products').removeById(id).value();
  }

  shipOrder(id, shipped) {
    return this.store.get('products').updateById(id, { shipped }).value();
  }
}

module.exports = SportsDataSource;
