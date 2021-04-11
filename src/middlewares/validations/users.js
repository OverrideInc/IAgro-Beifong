const userValidator = require('../../validators/user');
const BadRequestError = require('../../errors/badRequestError');
const AuthenticationError = require('../../errors/authenticationError');
const User = require('../../models/User');
const actions = require('../../constants/actions');

const validateUserData = (action) => async (req, res, next) => {
  const { body, headers } = req;
  const { error } = userValidator(body, action);

  if (error) throw error;

  const { password, user_type: userType } = body;

  if (password && !User.isSecurePassword(password))
    throw new BadRequestError(`Password ${password} is not secure`);

  const { user: currentUser } = headers;

  if (
    action === actions.CREATE &&
    (userType === User.validUserTypes.ADMIN ||
      (typeof userType !== 'undefined' &&
        currentUser.user_type === User.validUserTypes.MANAGER &&
        userType !== User.validUserTypes.TERRA))
  ) {
    throw new BadRequestError(
      `Users with role ${currentUser.user_type} are not allowed to create users with role ${userType}.`
    );
  } else if (
    action === actions.LOGIN &&
    !(await currentUser.verifyPassword(password))
  ) {
    throw new AuthenticationError(
      `Wrong password for user ${currentUser.username} of type ${currentUser.user_type}.`
    );
  }

  next();
};

module.exports = {
  validateUserData,
};
