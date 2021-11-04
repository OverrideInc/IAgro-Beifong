const moment = require('moment');
const fs = require('fs');
const stringify = require('csv-stringify');

const measures = require('../repositories/measures');
const Measure = require('../models/Measure');
const AwsS3Client = require('../lib/awsS3Client.js');

const TMP_DATA_DIR = '/tmp';
const { MEASURES_S3_BUCKET } = process.env;

const convertToPercentage = (measure) => 100 - (measure / 1023.0) * 100;

const writeFile = async (columns, data, stringifier, outputStream) => {
  await Promise.all(
    data.map(async (measure) => {
      const rowToSave = columns.map((column) =>
        column.includes('moisture')
          ? convertToPercentage(measure.payload[column])
          : measure.payload[column]
      );

      rowToSave[rowToSave.length - 1] = measure.created_at;

      stringifier.write(rowToSave);

      await measures.update(measure.id, {
        status: Measure.validMeasureStatus.PROCESSED,
      });
    })
  );

  stringifier.pipe(outputStream);
  stringifier.end();
};

const generateResponseFile = (columns, dstFile, data) =>
  new Promise((resolve, reject) => {
    const stringifier = stringify({
      delimiter: ',',
      header: true,
      columns,
    });

    stringifier.on('error', reject);

    const outputStream = fs.createWriteStream(dstFile, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });

    outputStream.on('finish', resolve);
    outputStream.on('error', reject);

    writeFile(columns, data, stringifier, outputStream);
    console.log(`[LOG] File ${dstFile} generated.`);
  });

const deleteTmpFile = (file) => {
  try {
    fs.unlinkSync(file);
  } catch (error) {
    console.log('error', error);
  }
};

const uploadFile = async (file, fileBaseName) => {
  try {
    await AwsS3Client.upload(file, MEASURES_S3_BUCKET, fileBaseName);
    console.log(`[LOG] File ${file} uploaded to S3,`);
    deleteTmpFile(file);
  } catch (error) {
    console.log('error', error);
  }
};

/**
 * Get all measures with status NEW and creates an array of promises to set status EXPIRED
 * @returns
 */
const generateCSV = async () => {
  const newMeasures = await measures.findNew();

  if (newMeasures.length === 0) {
    console.log('[LOG] 0 rows to process.');
    return;
  }

  console.log(`[LOG] Processing ${newMeasures.length} rows.`);

  const columns = Object.keys(newMeasures[0].payload);
  columns.push('date');

  const fileBaseName = `measures-${moment().format('YYYYMMDD')}.csv`;
  const responseFilePath = `${TMP_DATA_DIR}/${fileBaseName}`;

  await generateResponseFile(columns, responseFilePath, newMeasures);
  await uploadFile(responseFilePath, fileBaseName);
};

module.exports = {
  generateCSV,
};
