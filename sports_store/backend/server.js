/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const jsonServer = require('json-server');
const chokidar = require('chokidar');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const ProductsDataSource = require('./datasources/ProductsDataSource');
const CategoriesDataSource = require('./datasources/CategoriesDataSource');
const resolvers = require('./graphql/resolvers');

const fileName = process.argv[2] || './data.js';
const port = process.argv[3] || 3500;
let router;
let store;
const app = express();

const createServer = () => new Promise((resolve) => {
  // If a module isn’t in the cache, require will load the module again from disk
  delete require.cache[require.resolve(fileName)];

  /* The json-server package supports pagination through query strings.
   * Example: http://localhost:3500/api/products?
      - category_like=watersports & 
      - _page=2 & 
      - _limit=3 & 
      - _sort=name.
   * It will also produce custom headers like X-Total-Count and Link */
  setTimeout(() => {
    router = jsonServer.router(fileName.endsWith('.js')
      ? require(fileName)() : fileName);
    store = router.db;
    return resolve(true);
  }, 100);
});

async function bootstrap() {
  await createServer();

  app.use(cors());
  app.use(jsonServer.bodyParser);
  app.use('/api', (req, resp, next) => router(req, resp, next));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      productsAPI: new ProductsDataSource({ store }),
      categoriesAPI: new CategoriesDataSource({ store }),
    }),
  });
  server.applyMiddleware({ app });

  chokidar.watch(fileName).on('change', () => {
    console.log('Reloading web service data...');
    createServer();
    console.log('Reloading web service data complete.');
  });

  app.listen(port, () => console.log(`Web service running on port ${port}`));
}


bootstrap();
