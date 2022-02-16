const { DataTypes, Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      user_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_avatar: {
        type: DataTypes.STRING.BINARY,
        defaultValue: null,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      modelName: 'users',
    });
  }

  static associate(models) {
    this.hasMany(models.clients, { foreignKey: 'user_id', as: 'clients' });
  }
}

module.exports = User;