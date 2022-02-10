const express = require('express');
const router = new express.Router();
const ClientController = require('../controllers/ClientController');

router.get('/clients', ClientController.getAllClients);
router.post('/clients', ClientController.store);

module.exports = router;