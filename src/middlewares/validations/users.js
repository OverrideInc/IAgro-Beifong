const userValidator = require('../../validators/user');
const BadRequestError = require('../../errors/badRequestError');
const User = require('../../models/User');

const validateUserData = (action) => (req, res, next) => {
  const { body, headers } = req;
  const { error } = userValidator(body, action);

  if (error) throw error;

  const { password, user_type: userType } = body;

  if (password && !User.isSecurePassword(password))
    throw new BadRequestError(`Password ${password} is not secure`);

  const { user: currentUser } = headers;

  if (
    userType === User.validUserTypes.ADMIN ||
    (typeof userType !== 'undefined' &&
      currentUser.user_type === User.validUserTypes.MANAGER &&
      userType !== User.validUserTypes.TERRA)
  )
    throw new BadRequestError(
      `Users with role ${currentUser.user_type} are not allowed to create users with role ${userType}.`
    );

  next();
};

module.exports = {
  validateUserData,
};
