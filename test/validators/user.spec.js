const userValidation = require('../../src/validators/user');
const { user1: userData } = require('../fixtures/users');

describe('validations/user', () => {
  const itIsInvalid = (params, action = 'create') => {
    it('is invalid', () => {
      expect(userValidation(params, action).error).toBeTruthy();
    });
  };

  const itIsValid = (params, action = 'create') => {
    it('is valid', () => {
      expect(userValidation(params, action).error).toBeUndefined();
    });
  };

  describe('create', () => {
    describe('is valid when the user is correct', () => {
      itIsValid(userData);
    });

    describe('customer_id', () => {
      describe('when it is not present', () => {
        itIsValid({ ...userData, customer_id: undefined });
      });

      describe('when it is present', () => {
        describe('when it is not a number', () => {
          itIsInvalid({ ...userData, customer_id: 'value' });
        });

        describe('when it is a number', () => {
          describe('when it is an integer', () => {
            itIsValid({ ...userData, customer_id: 1 });
          });

          describe('when it is not an integer', () => {
            itIsInvalid({ ...userData, customer_id: 1.5 });
          });
        });
      });
    });

    describe('app_name', () => {
      describe('when is not present', () => {
        itIsValid({ ...userData, app_name: undefined });
      });

      describe('when it is present', () => {
        describe('when it is an empty string', () => {
          itIsInvalid({ ...userData, app_name: '' });
        });

        describe('when it is not a string', () => {
          itIsInvalid({ ...userData, app_name: 1 });
        });
      });
    });

    describe('username', () => {
      describe('when is not present', () => {
        itIsInvalid({ ...userData, username: undefined });
      });

      describe('when it is present', () => {
        describe('when it is an empty string', () => {
          itIsInvalid({ ...userData, username: '' });
        });

        describe('when it is not a string', () => {
          itIsInvalid({ ...userData, username: 1 });
        });
      });
    });

    describe('password', () => {
      describe('when is not present', () => {
        itIsValid({ ...userData, password: undefined });
      });

      describe('when it is present', () => {
        describe('when it is an empty string', () => {
          itIsInvalid({ ...userData, password: '' });
        });

        describe('when it is not a string', () => {
          itIsInvalid({ ...userData, password: 1 });
        });

        describe('when it is less than 8 characters', () => {
          itIsInvalid({ ...userData, password: 'Secu_12' });
        });
      });
    });

    describe('user_type', () => {
      describe('when is not present', () => {
        itIsValid({ ...userData, user_type: undefined });
      });

      describe('when it is present', () => {
        describe('when it is an empty string', () => {
          itIsInvalid({ ...userData, user_type: '' });
        });

        describe('when it is an not a correct value', () => {
          itIsInvalid({ ...userData, user_type: 'USER' });
        });

        describe('when it is not a string', () => {
          itIsInvalid({ ...userData, user_type: 1 });
        });
      });
    });
  });

  describe('login', () => {
    const { username, password } = userData;

    describe('is valid when the user is correct', () => {
      itIsValid({ username, password }, 'login');
    });

    describe('username', () => {
      describe('when is not present', () => {
        itIsInvalid({ username: undefined, password }, 'login');
      });

      describe('when it is present', () => {
        describe('when it is an empty string', () => {
          itIsInvalid({ ...userData, username: '' }, 'login');
        });

        describe('when it is not a string', () => {
          itIsInvalid({ ...userData, username: 1 }, 'login');
        });
      });
    });

    describe('password', () => {
      describe('when is not present', () => {
        itIsInvalid({ username, password: undefined }, 'login');
      });

      describe('when it is present', () => {
        describe('when it is an empty string', () => {
          itIsInvalid({ username, password: '' }, 'login');
        });

        describe('when it is not a string', () => {
          itIsInvalid({ username, password: 1 }, 'login');
        });
      });
    });
  });
});
