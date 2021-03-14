const faker = require('faker');

const User = require('../../src/models/User');

const Factory = (name, customAttrs = {}) => {
  const factories = {
    user: async () => {
      const baseAttrs = {
        app_name: faker.name.firstName(),
        username: faker.name.lastName(),
        password: faker.random.uuid(),
      };
      const attrs = Object.assign(baseAttrs, customAttrs);

      return User.query().insert(attrs).returning('*');
    },
  };

  return factories[name]();
};

module.exports = Factory;
