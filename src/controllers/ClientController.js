const Client = require('../models/Client');
const Project = require('../models/Project');

module.exports = {
  async createClient(req, res) {
    try {
      const { full_name, client_email } = req.body;

      const client = await Client.create({ full_name, client_email });

      res.status(201).json(client);
    }
    catch (error) {
      res.send(error);
    }
  },

  async getAllClients(req, res) {
    try {
      const allClients = await Client.findAll();
      res.status(200).send(allClients);
    }
    catch (error) {
      res.status(404).send(error);
    }
  },

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