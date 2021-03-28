require('../knexTestHelper');

const Factory = require('../factories');

const { UserSerializer } = require('../../src/serializers');

describe('UserSerializer', () => {
  describe('serialize', () => {
    let user1;
    let user2;

    describe('serialize an array', () => {
      beforeEach(async () => {
        user1 = await Factory('user');
        user2 = await Factory('user');
      });

      it('returns the serialized array', async () => {
        const serializable = [user1, user2];

        const serialized = new UserSerializer().serialize(serializable);

        expect(serialized).toMatchObject([
          {
            id: user1.id,
            app_name: user1.app_name,
            username: user1.username,
            customer_id: user1.customer_id,
            user_type: user1.user_type,
          },
          {
            id: user2.id,
            app_name: user2.app_name,
            username: user2.username,
            customer_id: user2.customer_id,
            user_type: user2.user_type,
          },
        ]);
      });
    });

    describe('serialize an object', () => {
      it('returns the serialized array', async () => {
        user1 = await Factory('user');

        const serialized = new UserSerializer().serialize(user1);

        expect(serialized).toMatchObject({
          id: user1.id,
          app_name: user1.app_name,
          username: user1.username,
          customer_id: user1.customer_id,
          user_type: user1.user_type,
        });
      });
    });

    describe('serialize an invalid object', () => {
      it('returns null', async () => {
        const serialized = new UserSerializer().serialize(1);

        expect(serialized).toBeNull();
      });
    });
  });

  describe('serializeObject', () => {
    let user;

    beforeEach(async () => {
      user = await Factory('user');
    });

    it('returns the serialized object', async () => {
      const serialized = new UserSerializer().serializeObject(user);

      expect(serialized).toMatchObject({
        id: user.id,
        app_name: user.app_name,
        username: user.username,
        customer_id: user.customer_id,
        user_type: user.user_type,
      });
    });

    it('includes password when the flag is set', async () => {
      const serialized = new UserSerializer({
        includePassword: true,
      }).serializeObject(user);

      expect(serialized).toMatchObject({
        id: user.id,
        app_name: user.app_name,
        username: user.username,
        customer_id: user.customer_id,
        user_type: user.user_type,
        password: user.password,
      });
    });
  });
});
