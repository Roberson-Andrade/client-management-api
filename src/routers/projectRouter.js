const express = require('express');
const router = new express.Router();
const ProjectController = require('../controllers/ProjectController');
const auth = require('../middleware/auth');

router.post('/clients/:client_id/projects', auth, ProjectController.createProject);
router.get('/clients/:client_id/projects', auth, ProjectController.getAllProjects);
router.patch('/clients/:client_id/projects/:project_id', auth, ProjectController.updateProject);
router.delete('/clients/:client_id/projects/:project_id', auth, ProjectController.deleteProject);

module.exports = router;