const Token = require('../models/Token');
const User = require('../models/User');

module.exports = {
  async createUser(req, res) {
    try {
      const { user_email: email } = req.body;
      const existentEmail = await User.findOne({ where: { user_email: email } });
      if (existentEmail) {
        return res.status(400).json({ error: 'This email is already being used!' });
      }

      const user = await User.create(req.body);

      const {
        user_name,
        user_avatar,
        user_email,
        createdAt,
      } = user;

      const token = await user.generateToken();
      res.status(201).json({
        user_name,
        user_email,
        user_avatar,
        createdAt,
        token,
      });
    }
    catch (error) {
      res.status(500).json(error);
    }
  },

  async loginUser(req, res) {
    try {
      const { user_email: email, user_password } = req.body;
      const user = await User.findOne({ where: { user_email: email } });

      if (!user) {
        return res.status(400).json({ error: 'Email or password is invalid' });
      }

      const isPasswordValid = await User.validatePassword(user_password, user.user_password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Email or password is invalid' });
      }

      const {
        user_name,
        user_avatar,
        user_email,
        createdAt,
      } = user;

      const token = await user.generateToken();
      res.json({
        user_name,
        user_email,
        user_avatar,
        createdAt,
        token,
      });
    }
    catch (error) {
      res.status(500).json(error);
    }
  },

  async getProfile(req, res) {
    try {
      const {
        user_name,
        user_avatar,
        user_email,
        createdAt,
      } = req.user;

      res.json({
        user_name,
        user_email,
        user_avatar,
        createdAt,
      });
    }
    catch (error) {
      res.status(500).json(error);
    }
  },

  async updateUser(req, res) {
    try {
      const user = req.user;
      const updatedUser = await User.update(req.body, { where: { id: user.id }, individualHooks: true });
      const {
        user_name,
        user_avatar,
        user_email,
      } = updatedUser[1][0];
      res.json({
        user_name,
        user_avatar,
        user_email,
      });
    }
    catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = req.user;
      await User.destroy({ where: { id: user.id } });

      res.status(204).end();
    }
    catch (error) {
      res.status(500).json(error);
    }
  },

  async logoutUser(req, res) {
    try {
      const token = req.token;
      await Token.destroy({ where: { id: token.id } });
      res.status(204).end();
    }
    catch (error) {
      res.status(500).json(error);
    }
  },

  async logoutAllUser(req, res) {
    try {
      const token = req.token;
      await Token.destroy({ where: { user_id: token.user_id } });
      res.status(200).end();
    }
    catch (error) {
      res.status(500).json(error);
    }
  },
};