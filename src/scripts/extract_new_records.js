// require('dotenv').config();
require('../initializers/knex')();

const { generateCSV } = require('../tasks/generateMeasuresCSV');

const main = async () => {
  await generateCSV();
};

// main()
//   .then(() => {
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.log(error);
//     process.exit(1);
//   });

module.exports.handler = main;
// Run as:
// node src/scripts/extract_new_records.js
