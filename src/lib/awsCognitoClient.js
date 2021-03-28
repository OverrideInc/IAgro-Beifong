/* eslint-disable class-methods-use-this */
require('cross-fetch/polyfill');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

class AwsCognitoClient {
  signUp(email, password) {
    if (process.env.NODE_ENV === 'test')
      return new Promise((resolve) => resolve());

    return new Promise((resolve, reject) => {
      const poolData = {
        UserPoolId: process.env.AWS_POOL_ID,
        ClientId: process.env.AWS_CLIENT_ID,
      };

      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

      userPool.signUp(email, password, [], null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result.user);
      });
    });
  }
}

module.exports = AwsCognitoClient;
