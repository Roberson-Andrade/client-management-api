const express = require('express');
const router = new express.Router();
const ClientController = require('../controllers/ClientController');

router.post('/clients', ClientController.createClient);
router.get('/clients', ClientController.getAllClients);
router.patch('/clients/:client_id', ClientController.updateClient);
router.delete('/clients/:client_id', ClientController.deleteClient);

module.exports = router;