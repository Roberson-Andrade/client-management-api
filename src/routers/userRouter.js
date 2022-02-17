const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/UserController');

router.post('/users', UserController.createUser);
router.post('/users/login', UserController.loginUser);
router.patch('/users/:user_id', UserController.updateUser);
router.delete('/users/:user_id', UserController.deleteUser);

module.exports = router;