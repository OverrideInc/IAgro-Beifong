const faker = require('faker');
const Customer = require('../../src/models/Customer');

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
    customer: async () => {
      const customerName = faker.name.firstName();
      const baseAttrs = {
        name: customerName,
        email: faker.internet.email(customerName),
      };
      const attrs = Object.assign(baseAttrs, customAttrs);

      return Customer.query().insert(attrs).returning('*');
    },
  };

  return factories[name]();
};

module.exports = Factory;
