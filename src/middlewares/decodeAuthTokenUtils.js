const jwtDecode = require('jwt-decode');
const users = require('../repositories/users');

const addUserToRequest = async (req, _res, next) => {
  const authToken = req.headers.authorization;
  let username;
  let user;
  if (authToken) {
    const tokenParams = jwtDecode(authToken);

    username = tokenParams['cognito:username'] || tokenParams.username;

    if (username) {
      user = await users.findByUsername(username);
      req.headers.user = user;
    }
  }

  if (!user && req.body.username && req.originalUrl.includes('login')) {
    username = req.body.username;

    user = await users.findByUsername(username);
    req.headers.user = user;
  }

  next();
};

module.exports = {
  addUserToRequest,
};
