const Project = require('../models/Project');
const Client = require('../models/Client');

module.exports = {
  async createProject(req, res) {
    try {
      const { user_id } = req.params;
      const { title, description, value, deadline } = req.body;
      const project = await Project.create({
        user_id,
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
      const { user_id } = req.params;
      const client = await Client.findByPk(user_id);

      if (!client) {
        return res.status(404).send({ error: 'The client doesn\'t exist.' });
      }

      const projects = await Project.findAll({ where: { user_id } });

      res.send(projects);
    }
    catch (error) {
      res.status(500).send();
    }
  },
};