const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index');

class Client extends Model {}

Client.init({
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Client',
});

module.exports = Client;