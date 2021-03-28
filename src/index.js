require('./initializers/knex')();

const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes');
const { addUserToRequest } = require('./middlewares/decodeAuthTokenUtils');
const {
  errorHandler,
  withErrorHandling,
} = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(withErrorHandling(addUserToRequest));
app.use(routes);

app.use(errorHandler);

module.exports.handler = serverless(app);
