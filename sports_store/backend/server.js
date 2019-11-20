/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const jsonServer = require('json-server');
const chokidar = require('chokidar');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
/* Middleware to proxy requests through a specified index page, useful
 * for Single Page Applications that utilise the HTML5 History API. */
const history = require('connect-history-api-fallback');
const typeDefs = require('./graphql/schema');
const SportsDataSource = require('./datasources/SportsDataSource');
const resolvers = require('./graphql/resolvers');
const auth = require('./authMiddleware');

const fileName = process.env.DATA || './data/data.js';
const port = process.env.PORT || 3500;
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

  const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  };

  app.use(history());
  app.use('/', express.static('./build'));

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(jsonServer.bodyParser);
  app.use(auth);
  app.use('/api', (req, resp, next) => router(req, resp, next));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      sportsAPI: new SportsDataSource({ store }),
    }),
  });
  server.applyMiddleware({ app, cors: corsOptions });

  chokidar.watch(fileName).on('change', () => {
    console.log('Reloading web service data...');
    createServer();
    console.log('Reloading web service data complete.');
  });

  app.listen(port, () => console.log(`Web service running on port ${port}`));
}


bootstrap();
