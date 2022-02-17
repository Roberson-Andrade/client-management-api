const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

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
      hooks: {
        async beforeCreate(user) {
          const hashedPassword = await bcrypt.hash(user.user_password, 8);
          user.user_password = hashedPassword;
        },
      },
    });
  }

  static associate(models) {
    this.hasMany(models.clients, { foreignKey: 'user_id', as: 'clients' });
  }

  static async validatePassword(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}

module.exports = User;