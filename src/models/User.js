/* eslint-disable global-require */
const { Model } = require('objection');
const _ = require('lodash');
const passwordGenerator = require('secure-random-password');
const bcrypt = require('bcrypt');

const SALT_ROUNDS_FOR_PASSWORD = 6;

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
    const Customer = require('./Customer');

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

  static isSecurePassword(password) {
    const passwordCheck = /^(?=.*\d)(?=.*[!@#$%^&*()_])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    return passwordCheck.test(password);
  }

  static generatePassword() {
    return passwordGenerator.randomPassword({
      characters: [
        passwordGenerator.lower,
        passwordGenerator.upper,
        passwordGenerator.digits,
        passwordGenerator.symbols.concat('_'),
      ],
    });
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS_FOR_PASSWORD);
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);

    if (!this.password || !User.isSecurePassword(this.password))
      this.password = User.generatePassword();

    this.password = await User.hashPassword(this.password);

    if (
      !this.user_type ||
      !Object.values(User.validUserTypes).includes(this.user_type)
    )
      this.user_type = User.validUserTypes.TERRA;
  }

  async $afterFind(queryContext) {
    await super.$afterFind(queryContext);

    const customer = await this.$relatedQuery('customer');

    if (!this.app_name && customer) {
      this.app_name = `${_.snakeCase(customer.name)}_${this.user_type}_${
        this.id
      }`;
    }
  }
}

module.exports = User;
