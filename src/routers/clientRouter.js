const express = require('express');
const router = new express.Router();
const ClientController = require('../controllers/ClientController');

router.get('/clients', ClientController.getAllClients);
router.get('/projects/:user_id', ClientController.getAllProjects);

router.post('/clients', ClientController.createClient);
router.post('/projects/:user_id', ClientController.createProject);

module.exports = router;