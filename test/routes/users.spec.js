require('../knexTestHelper');

const request = require('supertest');

const constants = require('../support/constants');
const { stringifyTimestamps } = require('../support/date');
const Factory = require('../factories');
const { UserSerializer } = require('../../src/serializers');

describe('route/users', () => {
  describe('GET /users', () => {
    let users;

    describe('requesting with no auth', () => {
      it('returns 401 status code when no token provided', async () => {
        const response = await request(constants.TEST_PATH)
          .get('/users')
          .query({
            _order: 'ASC',
            _sort: 'id',
            _start: 0,
            _end: 10,
          })
          .set({
            Accept: 'application/json',
          });

        expect(response.status).toBe(401);
      });

      it('returns 401 status code when TERRA token provided', async () => {
        await Factory('user', {
          user_type: 'TERRA',
          username: 'terra',
        });

        const response = await request(constants.TEST_PATH)
          .get('/users')
          .query({
            _order: 'ASC',
            _sort: 'id',
            _start: 0,
            _end: 10,
          })
          .set({
            authorization: process.env.TERRA_TOKEN,
            Accept: 'application/json',
          });

        expect(response.status).toBe(401);
      });
    });

    describe('requesting with auth', () => {
      beforeEach(async () => {
        const adminUser = await Factory('user', {
          user_type: 'ADMIN',
          username: 'admin',
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
            authorization: process.env.ADMIN_TOKEN,
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
            authorization: process.env.ADMIN_TOKEN,
            Accept: 'application/json',
          });

        const serialized = new UserSerializer().serialize(users);

        expect(response.body).toMatchObject(stringifyTimestamps(serialized));
      });
    });
  });

  describe('POST /users', () => {
    describe('requesting with no auth', () => {
      it('returns 401 status code when no token provided', async () => {
        const response = await request(constants.TEST_PATH).post('/users').set({
          Accept: 'application/json',
        });

        expect(response.status).toBe(401);
      });

      it('returns 401 status code when TERRA token provided', async () => {
        await Factory('user', {
          user_type: 'TERRA',
          username: 'terra',
        });

        const response = await request(constants.TEST_PATH).post('/users').set({
          Accept: 'application/json',
          authorization: process.env.TERRA_TOKEN,
        });

        expect(response.status).toBe(401);
      });
    });

    describe('requesting with auth', () => {
      describe('creating a new user', () => {
        describe('using an admin user', () => {
          beforeEach(async () => {
            await Factory('user', {
              user_type: 'ADMIN',
              username: 'admin',
            });
          });

          it('returns 422 when customer_id is missing', async () => {
            const response = await request(constants.TEST_PATH)
              .post('/users')
              .set({
                Accept: 'application/json',
                authorization: process.env.ADMIN_TOKEN,
              })
              .send({
                username: 'new_user',
              });

            expect(response.status).toBe(422);
          });

          it('returns 201 when data is complete', async () => {
            const customer = await Factory('customer');

            const response = await request(constants.TEST_PATH)
              .post('/users')
              .set({
                Accept: 'application/json',
                authorization: process.env.ADMIN_TOKEN,
              })
              .send({
                username: 'new_user',
                customer_id: customer.id,
              });

            expect(response.status).toBe(201);
          });
        });

        describe('using a manager user', () => {
          let customer;

          beforeEach(async () => {
            customer = await Factory('customer');

            await Factory('user', {
              user_type: 'MANAGER',
              username: 'manager',
              customer_id: customer.id,
            });
          });

          it('returns 400 when tries to create a no TERRA user', async () => {
            const response = await request(constants.TEST_PATH)
              .post('/users')
              .set({
                Accept: 'application/json',
                authorization: process.env.MANAGER_TOKEN,
              })
              .send({
                username: 'new_user',
                user_type: 'MANAGER',
              });

            expect(response.status).toBe(400);
          });

          it('returns 201 when data is complete', async () => {
            const response = await request(constants.TEST_PATH)
              .post('/users')
              .set({
                Accept: 'application/json',
                authorization: process.env.MANAGER_TOKEN,
              })
              .send({
                username: 'new_user',
              });

            expect(response.status).toBe(201);
            expect(response.body.customer_id).toBe(customer.id);
          });
        });
      });

      describe('failing to create', () => {
        it('returns 400 when password is not secure', async () => {
          await Factory('user', {
            user_type: 'ADMIN',
            username: 'admin',
          });

          const customer = await Factory('customer');

          const response = await request(constants.TEST_PATH)
            .post('/users')
            .set({
              Accept: 'application/json',
              authorization: process.env.ADMIN_TOKEN,
            })
            .send({
              username: 'new_user',
              customer_id: customer.id,
              password: 'insecure',
            });

          expect(response.status).toBe(400);
        });

        it('returns 500 when the user exists', async () => {
          await Factory('user', {
            user_type: 'ADMIN',
            username: 'admin',
          });

          await Factory('user', { username: 'new_user' });

          const customer = await Factory('customer');

          const response = await request(constants.TEST_PATH)
            .post('/users')
            .set({
              Accept: 'application/json',
              authorization: process.env.ADMIN_TOKEN,
            })
            .send({
              username: 'new_user',
              customer_id: customer.id,
              password: 'Secure_321',
            });

          expect(response.status).toBe(500);
        });
      });
    });
  });
});
