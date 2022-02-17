const { DataTypes, Model } = require('sequelize');

class Token extends Model {
  static init(sequelize) {
    super.init({
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'tokens',
      updatedAt: false,
      createdAt: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.users, { foreignKey: 'user_id' });
  }
}

module.exports = Token;