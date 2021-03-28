const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const ConflictError = require('../errors/conflictError');
const users = require('../repositories/users');
const { UserSerializer } = require('../serializers');
const AwsCognitoClient = require('../lib/awsCognitoClient');
const UnprocessableEntityError = require('../errors/unprocessableEntityError');

const usersController = {
  list: async (req, res) => {
    const {
      query: {
        _order: order,
        _sort: sort,
        _start: start,
        _end: end,
        id: ids,
        ...filters
      },
    } = req;

    const { results, total } = await users.list({
      start,
      end,
      sort,
      order,
      ...filters,
    });

    const usersList = new UserSerializer().serialize(results);

    res
      .status(StatusCodes.OK)
      .header('Access-Control-Expose-Headers', 'X-Total-Count')
      .header('X-Total-Count', total)
      .send(usersList);
  },

  create: async (req, res) => {
    const { app_name: appName, username, user_type: userType } = req.body;

    let { password, customer_id: customerId } = req.body;

    if (!customerId) {
      const { user: currentUser } = req.headers;
      customerId = currentUser.customer_id;
    }

    if (!customerId)
      throw new UnprocessableEntityError(
        'Users need to be associated to a customer.'
      );

    let includePassword = false;
    if (!password) {
      password = User.generatePassword();
      includePassword = true;
    }

    await new AwsCognitoClient().signUp(username, password).then(
      (result) => result,
      (err) => {
        if (err) {
          throw new ConflictError(
            `User was not created at cognito: ${err.message}`
          );
        }
      }
    );

    const user = await users.create({
      app_name: appName,
      username,
      password,
      user_type: userType,
      customer_id: customerId,
    });

    const serialized = new UserSerializer({ includePassword }).serialize(user);
    res.status(StatusCodes.CREATED).json(serialized);
  },
};

module.exports = usersController;
