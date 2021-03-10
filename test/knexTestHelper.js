const knexCleaner = require('knex-cleaner');
const knexConnection = require('../src/initializers/knex')();

beforeEach(async () => {
  await knexCleaner.clean(knexConnection, {
    ignoreTables: ['knex_migrations'],
  });
});

afterAll(() => knexConnection.destroy());
