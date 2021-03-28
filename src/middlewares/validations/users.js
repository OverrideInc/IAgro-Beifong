const userValidator = require('../../validators/user');
const ConflictError = require('../../errors/conflictError');

const validateUserData = (action) => ({ body }, res, next) => {
  const { error } = userValidator(body, action);

  if (error) throw error;

  const passwordTest = /^(?=.*\d)(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordTest.test(body.password))
    throw new ConflictError('Insecure Password');

  next();
};

module.exports = {
  validateUserData,
};
