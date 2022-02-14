const Client = require('../models/Client');

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
};