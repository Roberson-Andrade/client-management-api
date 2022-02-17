const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');

router.post('/users', UserController.createUser);
router.post('/users/login', UserController.loginUser);
router.patch('/users/:user_id', auth, UserController.updateUser);
router.delete('/users/:user_id', auth, UserController.deleteUser);

module.exports = router;