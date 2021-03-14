require('./initializers/knex')();

const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(routes);

module.exports.handler = serverless(app);
