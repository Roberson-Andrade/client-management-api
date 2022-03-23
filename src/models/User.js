const { DataTypes, Model } = require('sequelize');
const Token = require('../models/Token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        async beforeUpdate(user) {
          if (user.getDataValue('user_password') === user.previous('user_password')) {
            return;
          }
          const hashedPassword = await bcrypt.hash(user.user_password, 8);
          user.user_password = hashedPassword;
        },
      },
    });
  }

  static associate(models) {
    this.hasMany(models.clients, { foreignKey: 'user_id', as: 'clients' });
    this.hasMany(models.tokens, { foreignKey: 'user_id', as: 'tokens' });
  }

  static async validatePassword(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async generateToken() {
    const token = jwt.sign({ id: this.dataValues.id }, process.env.JWT_SECRET, { expiresIn: '1 day' });

    Token.create({ user_id: this.dataValues.id, token });
    return token;
  }
}

module.exports = User;