const jwtDecode = require('jwt-decode');
const users = require('../repositories/users');

const addUserToRequest = async (req, _res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    const tokenParams = jwtDecode(authToken);

    const username = tokenParams['cognito:username'];

    if (username) {
      const user = await users.findByUsername(username);
      req.headers.user = user;
    }
  }

  next();
};

module.exports = {
  addUserToRequest,
};
