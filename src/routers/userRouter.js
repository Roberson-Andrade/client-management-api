const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');

router.post('/users', UserController.createUser);
router.post('/users/login', UserController.loginUser);
router.get('/users', auth, UserController.getProfile);
router.patch('/users', auth, UserController.updateUser);
router.delete('/users', auth, UserController.deleteUser);
router.post('/users/logout', auth, UserController.logoutUser);

module.exports = router;