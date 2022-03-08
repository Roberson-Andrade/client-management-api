const Token = require('../models/Token');
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

      const {
        user_name,
        user_avatar,
        user_email: email,
        createdAt,
      } = user;

      const token = await user.generateToken();
      res.status(201).send({
        user_name,
        email,
        user_avatar,
        createdAt,
        token,
      });
    }
    catch (error) {
      res.status(500).send(error);
    }
  },

  async loginUser(req, res) {
    try {
      const { user_email, user_password } = req.body;
      const user = await User.findOne({ where: { user_email } });

      if (!user) {
        return res.status(400).send({ error: 'Email or password is invalid' });
      }

      const isPasswordValid = await User.validatePassword(user_password, user.user_password);

      if (!isPasswordValid) {
        return res.status(400).send({ error: 'Email or password is invalid' });
      }

      const {
        user_name,
        user_avatar,
        user_email: email,
        createdAt,
      } = user;

      const token = await user.generateToken();
      res.send({
        user_name,
        email,
        user_avatar,
        createdAt,
        token,
      });
    }
    catch (error) {
      res.status(500).send(error);
    }
  },

  async getProfile(req, res) {
    try {
      const {
        user_name,
        user_avatar,
        user_email: email,
        createdAt,
      } = req.user;

      res.send({
        user_name,
        email,
        user_avatar,
        createdAt,
      });
    }
    catch (error) {
      res.status(500).send(error);
    }
  },

  async updateUser(req, res) {
    try {
      const user = req.user;
      const updatedUser = await User.update(req.body, { where: { id: user.id } });
      res.send(updatedUser);
    }
    catch (error) {
      res.status(500).send(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = req.user;
      const deletedUser = await User.destroy({ where: { id: user.id } });

      res.status(200).json(deletedUser);
    }
    catch (error) {
      res.status(500).send(error);
    }
  },

  async logoutUser(req, res) {
    try {
      const token = req.token;
      await Token.destroy({ where: { id: token.id } });
      res.status(200).send();
    }
    catch (error) {
      res.status(500).send(error);
    }
  },

  async logoutAllUser(req, res) {
    try {
      const token = req.token;
      await Token.destroy({ where: { user_id: token.user_id } });
      res.status(200).send();
    }
    catch (error) {
      res.status(500).send(error);
    }
  },
};