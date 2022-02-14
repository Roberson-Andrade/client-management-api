const express = require('express');
const router = new express.Router();
const ProjectController = require('../controllers/ProjectController');

router.post('/projects/:client_id', ProjectController.createProject);
router.get('/projects/:client_id', ProjectController.getAllProjects);
router.patch('/projects/:project_id', ProjectController.updateProject);
router.delete('/projects/:project_id', ProjectController.deleteProject);

module.exports = router;