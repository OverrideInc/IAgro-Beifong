const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    if (!this.api_key) this.api_key = uuidv4();
  }
}

module.exports = User;
