/* eslint-disable global-require */
const { Model } = require('objection');

class Customer extends Model {
  static get tableName() {
    return 'customers';
  }

  static get relationMappings() {
    const User = require('./User');

    return {
      User: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'customers.id',
          to: 'user.customer_id',
        },
      },
    };
  }
}
module.exports = Customer;
