/* eslint-disable no-return-await */
const User = require('../models/User');

const findById = async (id) => User.query().findById(id);

const findByUsername = async (username) => User.query().findOne({ username });

const list = async ({ start, end, sort: column, order, ...filters }) =>
  User.query().where(filters).orderBy([{ column, order }]).range(start, end);

const create = async (data) => await User.query().insert(data).returning('*');

const update = async (id, data) =>
  await User.query().patchAndFetchById(id, data);

const remove = async (id) => User.query().deleteById(id);

module.exports = {
  list,
  findById,
  findByUsername,
  create,
  update,
  remove,
};
