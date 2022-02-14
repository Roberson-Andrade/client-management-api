const { DataTypes, Model } = require('sequelize');

class Client extends Model {
  static init(sequelize) {
    super.init({
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
      modelName: 'clients',
    });
  }

  static associate(models) {
    this.hasMany(models.projects, { foreignKey: 'client_id', as: 'projects' });
  }
}

module.exports = Client;