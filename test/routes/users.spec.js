require('../knexTestHelper');

const request = require('supertest');

const constants = require('../support/constants');
const { stringifyTimestamps } = require('../support/date');
const Factory = require('../factories');
const { UserSerializer } = require('../../src/serializers');

describe('route/users', () => {
  describe('GET /users', () => {
    let users;

    beforeEach(async () => {
      const adminUser = await Factory('user', {
        user_type: 'ADMIN',
        username: 'camilo',
      });
      users = [adminUser, await Factory('user'), await Factory('user')];
    });

    it('returns 200 status code', async () => {
      const response = await request(constants.TEST_PATH)
        .get('/users')
        .query({
          _order: 'ASC',
          _sort: 'id',
          _start: 0,
          _end: 10,
        })
        .set({
          authorization: process.env.DUMMY_TOKEN,
          Accept: 'application/json',
        });

      expect(response.status).toBe(200);
    });

    it('returns the users serialized', async () => {
      const response = await request(constants.TEST_PATH)
        .get('/users')
        .query({
          _order: 'ASC',
          _sort: 'id',
          _start: 0,
          _end: 10,
        })
        .set({
          authorization: process.env.DUMMY_TOKEN,
          Accept: 'application/json',
        });

      const serialized = new UserSerializer().serialize(users);

      expect(response.body).toMatchObject(stringifyTimestamps(serialized));
    });
  });
});
