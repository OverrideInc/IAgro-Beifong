/* eslint-disable class-methods-use-this */
require('cross-fetch/polyfill');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

class AwsCognitoClient {
  constructor() {
    const poolData = {
      UserPoolId: process.env.AWS_POOL_ID,
      ClientId: process.env.AWS_CLIENT_ID,
    };

    this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  }

  signUp(username, password) {
    if (process.env.NODE_ENV === 'test')
      return new Promise((resolve) => resolve());

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, [], null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result.user);
      });
    });
  }

  signIn(username, password) {
    if (process.env.NODE_ENV === 'test') {
      return new Promise((resolve) => {
        const result = {
          getIdToken: () => ({ getJwtToken: () => 'dummy_token' }),
        };
        resolve(result);
      });
    }

    const authenticationData = {
      Username: username,
      Password: password,
    };

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err),
      });
    });
  }
}

module.exports = AwsCognitoClient;
