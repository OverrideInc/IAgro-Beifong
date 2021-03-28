const express = require('express');

const router = express.Router();

const actions = require('../constants/actions');
const resources = require('../constants/resources');
const usersController = require('../controllers/users');
const { withErrorHandling } = require('../middlewares/errorHandler');
const authorizeUser = require('../middlewares/authorizeUser');
const usersValidations = require('../middlewares/validations/users');

router.get(
  '/',
  authorizeUser(resources.USERS, actions.LIST),
  withErrorHandling(usersController.list)
);

router.post(
  '/',
  authorizeUser(resources.USERS, actions.CREATE),
  usersValidations.validateUserData(actions.CREATE),
  withErrorHandling(usersController.create)
);

module.exports = router;
