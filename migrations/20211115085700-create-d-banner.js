'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('d_banners', {
      banner_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      banner_title: {
        type: Sequelize.STRING(150)
      },
      banner_description: {
        type: Sequelize.STRING(250)
      },
      banner_url: {
        type: Sequelize.STRING(150)
      },
      banner_order: {
        type: Sequelize.SMALLINT(4)
      },
      banner_active: {
        type: Sequelize.TINYINT(1)
      },
      banner_status: {
        type: Sequelize.TINYINT(1)
      },
      banner_start_date: {
        type: Sequelize.DATE
      },
      banner_end_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('d_banners');
  }
};