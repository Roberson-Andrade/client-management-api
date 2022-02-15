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

  async updateClient(req, res) {
    try {
      const { client_id } = req.params;

      const client = await Client.update(req.body, { where: { id: client_id } });

      if (!client[0]) {
        return res.status(404).send({ error: 'Client not found! ' });
      }

      res.json(client);
    }
    catch (error) {
      return res.status(500).send(error);
    }
  },

  async deleteClient(req, res) {
    try {
      const { client_id } = req.params;

      const client = await Client.destroy({ where: { id: client_id } });

      res.json(client);
    }
    catch (error) {
      return res.status(500).send(error);
    }
  },
};