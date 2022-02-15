const express = require('express');
const router = new express.Router();
const ProjectController = require('../controllers/ProjectController');

router.post('/clients/:client_id/projects', ProjectController.createProject);
router.get('/clients/:client_id/projects', ProjectController.getAllProjects);
router.patch('/clients/:client_id/projects/:project_id', ProjectController.updateProject);
router.delete('/clients/:client_id/projects/:project_id', ProjectController.deleteProject);

module.exports = router;