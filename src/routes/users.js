const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');

const { addUserToRequest } = require('../middlewares/decodeAuthTokenUtils');

router.get('/', addUserToRequest, usersController.list);

router.post('/', usersController.create);

module.exports = router;
