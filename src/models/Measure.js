/* eslint-disable global-require */
const { Model } = require('objection');

class Measure extends Model {
  static get tableName() {
    return 'measures';
  }

  static get validMeasureStatus() {
    return {
      NEW: 'NEW',
      PROCESSING: 'PROCESSING',
      PROCESSED: 'PROCESSED',
    };
  }
}
module.exports = Measure;
