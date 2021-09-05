const express = require('express');

const router = express.Router();

const actions = require('../constants/actions');
const resources = require('../constants/resources');
const measuresController = require('../controllers/measures');
const { withErrorHandling } = require('../middlewares/errorHandler');
const authorizeUser = require('../middlewares/authorizeUser');

router.post(
  '/',
  authorizeUser(resources.MEASURES, actions.CREATE),
  withErrorHandling(measuresController.create)
);

module.exports = router;
