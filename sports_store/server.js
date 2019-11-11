/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const jsonServer = require('json-server');
const chokidar = require('chokidar');
const cors = require('cors');

const fileName = process.argv[2] || './data.js';
const port = process.argv[3] || 3500;
let router;
const app = express();

const createServer = () => {
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
  }, 100);
};

createServer();

app.use(cors());
app.use(jsonServer.bodyParser);
app.use('/api', (req, resp, next) => router(req, resp, next));

chokidar.watch(fileName).on('change', () => {
  console.log('Reloading web service data...');
  createServer();
  console.log('Reloading web service data complete.');
});

app.listen(port, () => console.log(`Web service running on port ${port}`));
