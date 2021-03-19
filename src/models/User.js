const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const Customer = require('./Customer');

class User extends Model {
  static get validUserTypes() {
    return {
      ADMIN: 'ADMIN',
      MANAGER: 'MANAGER',
      TERRA: 'TERRA',
    };
  }

  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'users.customer_id',
          to: 'customers.id',
        },
      },
    };
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);

    if (!this.password) this.password = uuidv4();

    if (!this.user_type) this.user_type = User.validUserTypes.TERRA;
  }

  async $afterFind(queryContext) {
    await super.$afterFind(queryContext);

    if (!this.app_name && this.customer) {
      this.app_name = `${_.snakeCase(this.customer.name)}_${this.user_type}_${
        this.id
      }`;
    }
  }
}

module.exports = User;
