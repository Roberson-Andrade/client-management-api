const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

const Client = require('../models/Client');
const Project = require('../models/Project');
const User = require('../models/User');
const Token = require('../models/Token');

User.init(connection);
Client.init(connection);
Project.init(connection);
Token.init(connection);

User.associate(connection.models);
Client.associate(connection.models);
Project.associate(connection.models);
Token.associate(connection.models);

module.exports = connection;