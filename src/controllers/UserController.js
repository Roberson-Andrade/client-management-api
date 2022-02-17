const User = require('../models/User');

module.exports = {
  async createUser(req, res) {
    try {
      const { user_email } = req.body;
      const existentEmail = await User.findOne({ where: { user_email } });
      if (existentEmail) {
        return res.status(400).send({ error: 'This email is already being used!' });
      }

      const user = await User.create(req.body);
      res.status(201).send(user);
    }
    catch (error) {
      res.status(500).send(error);
    }
  },

  async updateUser(req, res) {
    try {
      const { user_id } = req.params;
      const user = await User.update(req.body, { where: { id: user_id } });
      res.send(user);
    }
    catch (error) {
      res.status(500).send(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const { user_id } = req.params;
      const user = await User.destroy({ where: { id: user_id } });

      res.status(200).json(user);
    }
    catch (error) {
      res.status(500).send(error);
    }
  },
};