const express = require('express');

const users = require('./users');
const measures = require('./measures');

const router = express.Router();

router.use('/users', users);
router.use('/measures', measures);

module.exports = router;
