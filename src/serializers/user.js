const Serializer = require('./serializer');

const BASE_FIELDS = ['id', 'app_name', 'username', 'customer_id', 'user_type'];

class UserSerializer extends Serializer {
  constructor(options = {}) {
    super({ collectionName: 'users' });

    const fields = [];

    if (options.includePassword) {
      fields.push('password');
    }

    this.baseFields = BASE_FIELDS.concat(fields);
  }
}

module.exports = UserSerializer;
