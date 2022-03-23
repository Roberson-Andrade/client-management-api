const Project = require('../models/Project');
const Client = require('../models/Client');
const allowFields = require('../utils/allowFields');

module.exports = {
  async createProject(req, res) {
    try {
      const { client_id } = req.params;
      const { title, description, value, deadline } = req.body;

      const client = await Client.findOne({ where: { id: client_id, user_id: req.user.id } });

      if (!client) {
        return res.status(404).json({ error: 'Client not found!' });
      }

      const project = await Project.create({
        client_id,
        title,
        description,
        value,
        deadline,
      });

      res.status(201).json(project);

    }
    catch (error) {
      res.status(500).json(error);
    }
  },

  async getAllProjects(req, res) {
    try {
      const { client_id } = req.params;
      const client = await Client.findByPk(client_id, {
        include: { association: 'projects' },
      });

      if (!client || client.user_id !== req.user.id) {
        return res.status(404).json({ error: 'The client doesn\'t exist.' });
      }

      if (client.projects.length === 0) {
        return res.status(404).json({ error: 'No projects found!' });
      }

      res.json(client.projects);
    }
    catch (error) {
      res.status(500).json(error);
    }
  },

  async updateProject(req, res) {
    try {
      const { client_id, project_id } = req.params;
      const client = await Client.findOne({ where: { id: client_id, user_id: req.user.id } });

      if (!client) {
        return res.status(404).json({ error: 'Client not found!' });
      }
      const allowedFields = ['title', 'description', 'value', 'deadline', 'completed'];
      const isFieldAllowed = allowFields(allowedFields, req.body);

      if (!isFieldAllowed) {
        return res.status(400).json({ error: 'Insert a valid field!' });
      }

      const project = await Project.update(req.body, {
        where: { id: project_id, client_id },
      });

      if (!project[0]) {
        return res.status(404).json({ error: 'Project not found!' });
      }

      res.json(project);
    }
    catch (error) {
      return res.status(500).json(error);
    }
  },

  async deleteProject(req, res) {
    try {
      const { client_id, project_id } = req.params;

      const client = await Client.findOne({ where: { id: client_id, user_id: req.user.id } });

      if (!client) {
        return res.status(404).json({ error: 'Client not found!' });
      }

      const project = await Project.destroy({ where: { id: project_id, client_id } });

      if (!project) {
        return res.status(404).json({ error: 'Project not found! ' });
      }

      res.status(204).end();
    }
    catch (error) {
      return res.status(500).json(error);
    }
  },
};