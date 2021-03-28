require('../knexTestHelper');

const Factory = require('../factories');
const users = require('../../src/repositories/users');

describe('repositories/users', () => {
  describe('list', () => {
    describe('ordering', () => {
      let user1;
      let user2;
      let user3;

      beforeEach(async () => {
        user1 = await Factory('user');
        user2 = await Factory('user');
        user3 = await Factory('user');
      });

      describe('by id DESC', () => {
        it('returns users ordered', async () => {
          const { results } = await users.list({
            start: 0,
            end: 10,
            sort: 'id',
            order: 'DESC',
          });

          expect(results).toEqual([user3, user2, user1]);
        });
      });
      describe('by id ASC', () => {
        it('returns companies ordered', async () => {
          const { results } = await users.list({
            start: 0,
            end: 10,
            sort: 'id',
            order: 'ASC',
          });

          expect(results).toEqual([user1, user2, user3]);
        });
      });
    });

    describe('pagination', () => {
      let user2;
      let user3;
      beforeEach(async () => {
        await Factory('user');
        user2 = await Factory('user');
        user3 = await Factory('user');
      });

      describe('range', () => {
        it('returns users withing range', async () => {
          const { results } = await users.list({
            start: 0,
            end: 1,
            sort: 'id',
            order: 'DESC',
          });

          expect(results).toEqual([user3, user2]);
        });
      });

      describe('count', () => {
        it('returns the count for all', async () => {
          const { total } = await users.list({
            start: 0,
            end: 1,
            sort: 'id',
            order: 'DESC',
          });

          expect(total).toBe(3);
        });
      });
    });

    describe('filtering', () => {
      let user1;

      beforeEach(async () => {
        user1 = await Factory('user');
        await Factory('user');
      });

      describe('range', () => {
        it('returns users filtered', async () => {
          const { results } = await users.list({
            start: 0,
            end: 10,
            sort: 'id',
            order: 'DESC',
            username: user1.username,
          });

          expect(results).toEqual([user1]);
        });
      });

      describe('count', () => {
        it('returns the count for all', async () => {
          const { total } = await users.list({
            start: 0,
            end: 10,
            sort: 'id',
            order: 'DESC',
            username: user1.username,
          });

          expect(total).toEqual(1);
        });
      });
    });
  });

  describe('findById', () => {
    describe('when user exist', () => {
      let existingUser;

      beforeEach(async () => {
        existingUser = await Factory('user');
      });

      it('returns the user', async () => {
        const user = await users.findById(existingUser.id);

        expect(user).toEqual(existingUser);
      });
    });

    describe('when user does not exist', () => {
      it('returns null', async () => {
        const user = await users.findById(-1);
        expect(user).toBeUndefined();
      });
    });
  });

  describe('findByUsername', () => {
    describe('when user exist', () => {
      let existingUser;

      beforeEach(async () => {
        existingUser = await Factory('user');
      });

      it('returns the user', async () => {
        const user = await users.findByUsername(existingUser.username);

        expect(user).toEqual(existingUser);
      });
    });

    describe('when user does not exist', () => {
      it('returns null', async () => {
        const user = await users.findByUsername('doesntexist');
        expect(user).toBeUndefined();
      });
    });
  });

  describe('create', () => {
    describe('when user does not exist', () => {
      it('creates and returns the user', async () => {
        const userParams = {
          app_name: 'test',
          username: 'test',
          password: 'Test_1234',
          user_type: 'TERRA',
        };

        const user = await users.create(userParams);
        expect(user.app_name).toBe(userParams.app_name);
        expect(user.username).toBe(userParams.username);
        expect(user.verifyPassword(userParams.password)).toBeTruthy();
        expect(user.user_type).toBe(userParams.user_type);
      });
    });
  });

  describe('update', () => {
    describe('when user exist', () => {
      let existingUser;

      beforeEach(async () => {
        existingUser = await Factory('user');
      });

      it('returns the updated user', async () => {
        const user = await users.update(existingUser.id, {
          username: 'new_username',
        });

        expect(user.username).not.toEqual(existingUser.username);
        expect(user.username).toBe('new_username');
      });
    });

    describe('when user does not exist', () => {
      it("doesn't return any user", async () => {
        const user = await users.update(-1, { username: 'nil' });

        expect(user).toBeUndefined();
      });
    });
  });

  describe('remove', () => {
    let existingUser;

    beforeEach(async () => {
      existingUser = await Factory('user');
    });

    describe('when user exist', () => {
      it('removes the user', async () => {
        await users.remove(existingUser.id);

        const user = await users.findById(existingUser.id);

        expect(user).toBeUndefined();
      });
    });

    describe('when user does not exist', () => {
      it("doesn't remove any user", async () => {
        const { results: resultsBefore } = await users.list({
          start: 0,
          end: 10,
          sort: 'id',
          order: 'DESC',
        });

        const countBefore = resultsBefore.length;

        await users.remove(-1);

        const { results: resultsAfter } = await users.list({
          start: 0,
          end: 10,
          sort: 'id',
          order: 'DESC',
        });

        const countAfter = resultsAfter.length;

        expect(countAfter).toBe(1);
        expect(countBefore).toEqual(countAfter);
      });
    });
  });
});
