const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

const Client = require('../models/Client');
const Project = require('../models/Project');

Client.init(connection);
Project.init(connection);

Client.associate(connection.models);
Project.associate(connection.models);

module.exports = connection;