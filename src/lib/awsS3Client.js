const fs = require('fs');
const s3 = require('../initializers/s3');

class AwsS3Client {
  static upload(src, bucket, file) {
    const srcStream = fs.createReadStream(src);

    const s3Params = {
      Body: srcStream,
      Bucket: bucket,
      Key: file,
    };

    return new Promise((resolve, reject) => {
      s3.putObject(s3Params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = AwsS3Client;
