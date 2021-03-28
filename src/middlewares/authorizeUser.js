const AuthenticationError = require('../errors/authenticationError');
const resolvePermission = require('./helpers/resolvePermission');

module.exports = (resource, action) => (req, _res, next) => {
  const { user } = req.headers;

  if (!user) throw new AuthenticationError('User not logged');

  if (!resolvePermission(user.user_type, resource, action))
    throw new AuthenticationError(
      `User not allowed to do action ${action} over resource ${resource}`
    );

  next();
};
