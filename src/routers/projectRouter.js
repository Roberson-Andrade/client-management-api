const express = require('express');
const router = new express.Router();
const ProjectController = require('../controllers/ProjectController');

router.post('/projects/:user_id', ProjectController.createProject);
router.get('/projects/:user_id', ProjectController.getAllProjects);

module.exports = router;