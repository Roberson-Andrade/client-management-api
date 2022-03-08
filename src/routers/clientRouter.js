const express = require('express');
const router = new express.Router();
const ClientController = require('../controllers/ClientController');
const auth = require('../middleware/auth');

router.post('/clients', auth, ClientController.createClient);
router.get('/clients', auth, ClientController.getAllClients);
router.patch('/clients/:client_id', auth, ClientController.updateClient);
router.delete('/clients/:client_id', auth, ClientController.deleteClient);

module.exports = router;