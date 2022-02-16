'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_avatar: {
        type: Sequelize.STRING.BINARY,
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
