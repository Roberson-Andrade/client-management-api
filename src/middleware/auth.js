const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const dbToken = await Token.findOne({ where: { token } });

    if (decoded.id !== dbToken.user_id) {
      throw new Error();
    }

    const user = await User.findByPk(decoded.id);
    req.token = dbToken;
    req.user = user;
    next();
  }
  catch (error) {
    if (error.message === 'jwt expired') {
      const token = req.header('Authorization').replace('Bearer ', '');
      await Token.destroy({ where: { token } });
    }
    res.status(401).send({ error: 'Please, authenticate!' });
  }
};

module.exports = auth;