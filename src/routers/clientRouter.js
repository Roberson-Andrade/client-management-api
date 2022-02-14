const express = require('express');
const router = new express.Router();
const ClientController = require('../controllers/ClientController');

router.post('/clients', ClientController.createClient);
router.get('/clients', ClientController.getAllClients);

module.exports = router;