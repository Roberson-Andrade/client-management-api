const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/UserController');

router.post('/users', UserController.createUser);

module.exports = router;