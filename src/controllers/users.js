const HttpStatus = require('http-status-codes');

const users = require('../repositories/users');

const { UserSerializer } = require('../serializers');

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
      listFilter,
    } = req;

    if (ids) {
      const usersList = await users.findByIds(ids, listFilter);
      const results = new UserSerializer().serialize(usersList);

      res.status(HttpStatus.OK).send(results);
    } else {
      const { results, total } = await users.list({
        start,
        end,
        sort,
        order,
        listFilter,
        ...filters,
      });

      const usersList = new UserSerializer().serialize(results);

      res
        .status(HttpStatus.OK)
        .header('Access-Control-Expose-Headers', 'X-Total-Count')
        .header('X-Total-Count', total)
        .send(usersList);
    }
  },

  create: async (req, res) => {
    const {
      app_name: appName,
      username,
      password,
      user_type: userType,
      customer_id: customerId,
    } = req.body;

    const user = await users.create({
      app_name: appName,
      username,
      password,
      user_type: userType,
      customer_id: customerId,
    });

    const serialized = new UserSerializer().serialize(user);
    res.status(HttpStatus.CREATED).json(serialized);
  },
};

module.exports = usersController;
