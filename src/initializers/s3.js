const AWS = require('@aws-sdk/client-s3');

const { S3_ACCESS_KEY, S3_SECRET_KEY } = process.env;

const s3DefaultConfig = {
  apiVersion: '2006-03-01',
  region: 'us-east-1',
};

const s3KeysConfig = {
  ...s3DefaultConfig,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
};

const s3Config = () =>
  S3_ACCESS_KEY && S3_SECRET_KEY ? s3KeysConfig : s3DefaultConfig;

const s3 = new AWS.S3(s3Config());

module.exports = s3;
