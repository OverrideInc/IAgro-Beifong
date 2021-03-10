const knex = require('knex');
const { Model } = require('objection');

const knexfile = require('../../knexfile');
const settings = require('./settings');

let knexConnection;

module.exports = () => {
  if (!knexConnection) {
    knexConnection = knex(knexfile[settings.NODE_ENV]);
    Model.knex(knexConnection);
  }

  return knexConnection;
};
