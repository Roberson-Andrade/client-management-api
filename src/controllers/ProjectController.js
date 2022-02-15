const Project = require('../models/Project');
const Client = require('../models/Client');

module.exports = {
  async createProject(req, res) {
    try {
      const { client_id } = req.params;
      const { title, description, value, deadline } = req.body;
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
      res.status(500).send(error);
    }
  },

  async getAllProjects(req, res) {
    try {
      const { client_id } = req.params;
      const client = await Client.findByPk(client_id, {
        include: { association: 'projects' },
      });

      if (!client) {
        return res.status(404).send({ error: 'The client doesn\'t exist.' });
      }

      res.send(client.projects);
    }
    catch (error) {
      res.status(500).send(error);
    }
  },

  async updateProject(req, res) {
    try {
      const { project_id } = req.params;

      const project = await Project.update(req.body, {
        where: { id: project_id },
      });

      if (!project[0]) {
        return res.status(404).send({ error: 'Project not found!' });
      }

      res.json(project);
    }
    catch (error) {
      return res.status(500).send(error);
    }
  },

  async deleteProject(req, res) {
    try {
      const { project_id } = req.params;

      const project = await Project.destroy({ where: { id: project_id } });

      res.json(project);
    }
    catch (error) {
      return res.status(500).send(error);
    }
  },
};