const Serializer = require('./serializer');

const BASE_FIELDS = ['id', 'status', 'payload'];

class MeasureSerializer extends Serializer {
  constructor(options = {}) {
    super({ collectionName: 'measures' });

    const fields = [];

    if (options.includeTimestamp) {
      fields.push('created_at');
    }

    this.baseFields = BASE_FIELDS.concat(fields);
  }
}

module.exports = MeasureSerializer;
