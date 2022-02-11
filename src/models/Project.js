const { DataTypes, Model } = require('sequelize');

class Project extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
      },
      deadline: {
        type: DataTypes.DATE,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
      modelName: 'projects',
      updatedAt: false,
    });
  }
}

module.exports = Project;