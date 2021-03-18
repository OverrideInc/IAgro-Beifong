const { Model } = require('objection');

const User = require('./User');

class Customer extends Model {
  static get tableName() {
    return 'customers';
  }

  static get relationMappings() {
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
