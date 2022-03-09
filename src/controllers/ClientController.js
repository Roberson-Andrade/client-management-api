const Client = require('../models/Client');

module.exports = {
  async createClient(req, res) {
    try {
      const { full_name, client_email } = req.body;
      const { id: user_id } = req.user;

      const client = await Client.create({ full_name, client_email, user_id });

      res.status(201).json(client);
    }
    catch (error) {
      res.send(error);
    }
  },

  async getAllClients(req, res) {
    try {
      const { id: user_id } = req.user;
      const allClients = await Client.findAll({ where: { user_id } });

      if (allClients.length === 0) {
        return res.status(404).send({ error: 'No clients found! ' });
      }

      res.status(200).send(allClients);
    }
    catch (error) {
      res.status(404).send(error);
    }
  },

  async updateClient(req, res) {
    try {
      const { client_id } = req.params;
      const { id: user_id } = req.user;
      const client = await Client.update(req.body, { where: { id: client_id, user_id } });

      if (!client[0]) {
        return res.status(404).send({ error: 'Client not found!' });
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
      const { id: user_id } = req.user;

      const deletedClient = await Client.destroy({ where: { id: client_id, user_id } });
      if (deletedClient === 0) {
        return res.status(404).send({ error: 'Client not found!' });
      }
      res.json(deletedClient);
    }
    catch (error) {
      return res.status(500).send(error);
    }
  },
};