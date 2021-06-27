const Joi = require('joi');
const User = require('../models/User');

const schema = {
  create: {
    app_name: Joi.string().optional(),
    username: Joi.string().required(),
    password: Joi.string().optional().min(8),
    customer_id: Joi.number().integer().optional(),
    user_type: Joi.string()
      .valid(...Object.values(User.validUserTypes))
      .optional(),
  },
  login: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
};

module.exports = (jsonObject, action) => {
  const object = Joi.object(schema[action]);
  return object.validate(jsonObject);
};
