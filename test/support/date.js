/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const stringifyTimestampsModel = (model) => {
  if (model.created_at) model.created_at = model.created_at.toISOString();
  if (model.updated_at) model.updated_at = model.updated_at.toISOString();
  if (model.starts_at) model.starts_at = model.starts_at.toISOString();
  if (model.ends_at) model.ends_at = model.ends_at.toISOString();
  if (model.expires_at) model.expires_at = model.expires_at.toISOString();
  if (model.sale_date) model.sale_date = model.sale_date.toISOString();
  return model;
};

const stringifyTimestampsRecursive = (model) => {
  for (const key of Object.keys(model)) {
    if (model[key] && typeof model[key] === 'object') {
      model[key] = stringifyTimestampsRecursive(model[key]);
    }
  }
  return stringifyTimestampsModel(model);
};

const stringifyTimestamps = (collection) => {
  if (Array.isArray(collection)) {
    return collection.map((model) => stringifyTimestampsRecursive(model));
  }

  return stringifyTimestampsRecursive(collection);
};

module.exports = {
  stringifyTimestamps,
};
