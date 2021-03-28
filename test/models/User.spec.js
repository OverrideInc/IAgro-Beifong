require('../knexTestHelper');

const _ = require('lodash');
const Factory = require('../factories');
const User = require('../../src/models/User');

describe('models/User', () => {
  describe('associations', () => {
    let user;
    let customer;

    beforeEach(async () => {
      customer = await Factory('customer');
      user = await Factory('user', { customer_id: customer.id });
    });

    describe('customer', () => {
      it('should be associated to a customer', async () => {
        const userCustomer = await user.$relatedQuery('customer');

        expect(userCustomer).toBeTruthy();
        expect(userCustomer).toMatchObject(customer);
      });
    });
  });

  describe('$beforeInsert', () => {
    let password;
    let userType;
    it('generates a secure password when null', async () => {
      password = null;
      const user = await Factory('user', { password });

      expect(user.password).not.toBe(password);
    });

    it('generates a secure password when insecure', async () => {
      password = 'insecure';
      const user = await Factory('user', { password });

      expect(await user.verifyPassword(password)).toBeFalsy();
    });

    it('hashes secure password', async () => {
      password = 'Secure_1';
      const user = await Factory('user', { password });

      expect(password).not.toBe(user.password);
      expect(await user.verifyPassword(password)).toBeTruthy();
    });

    it('set user_type as terra when null', async () => {
      userType = null;
      const user = await Factory('user', { user_type: userType });

      expect(userType).not.toBe(user.user_type);
      expect(user.user_type).toBe(User.validUserTypes.TERRA);
    });

    it('set user_type as terra when invalid', async () => {
      userType = 'INVALID';
      const user = await Factory('user', { user_type: userType });

      expect(userType).not.toBe(user.user_type);
      expect(user.user_type).toBe(User.validUserTypes.TERRA);
    });
  });

  describe('$afterFind', () => {
    it('sets app name using customer attributes', async () => {
      const customer = await Factory('customer');
      const user = await Factory('user', {
        app_name: null,
        customer_id: customer.id,
      });

      const userFetched = await User.query().findById(user.id);

      expect(userFetched.app_name).not.toBeNull();
      expect(userFetched.app_name).toBe(
        `${_.snakeCase(customer.name)}_${user.user_type}_${user.id}`
      );
    });
  });

  describe('isSecurePassword', () => {
    let password;

    it('returns true when password is secure', () => {
      password = 'Secure_123';

      expect(User.isSecurePassword(password)).toBeTruthy();
    });

    it('returns false when password is not secure', () => {
      password = 'insecure';

      expect(User.isSecurePassword(password)).toBeFalsy();
    });
  });

  describe('generatePassword', () => {
    it('generates a secure password', async () => {
      const password = User.generatePassword();
      expect(User.isSecurePassword(password)).toBeTruthy();
    });
  });
});
