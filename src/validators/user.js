const Joi = require('joi');
const User = require('../models/User');

const schema = {
  create: {
    app_name: Joi.string().optional(),
    username: Joi.string().required(),
    password: Joi.string().optional(),
    customer_id: Joi.number().required(),
    user_type: Joi.string()
      .valid(...Object.values(User.validUserTypes))
      .optional(),
  },
};

module.exports = (jsonObject, action) => {
  const object = Joi.object(schema[action]);
  return object.validate(jsonObject);
};
