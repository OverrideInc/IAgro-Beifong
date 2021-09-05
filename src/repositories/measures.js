/* eslint-disable no-return-await */
const Measure = require('../models/Measure');

const findById = async (id) => Measure.query().findById(id);

const findNew = async () =>
  Measure.query().where({ status: Measure.validMeasureStatus.NEW });

const create = async (data) =>
  await Measure.query().insert(data).returning('*');

const update = async (id, data) =>
  await Measure.query().patchAndFetchById(id, data);

const remove = async (id) => Measure.query().deleteById(id);

module.exports = {
  findById,
  findNew,
  create,
  update,
  remove,
};
