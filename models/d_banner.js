'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class d_banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  d_banner.init({
    banner_title: DataTypes.STRING,
    banner_description: DataTypes.STRING,
    banner_url: DataTypes.STRING,
    banner_order: DataTypes.SMALLINT,
    banner_active: DataTypes.TINYINT,
    banner_status: DataTypes.TINYINT,
    banner_start_date: DataTypes.DATE,
    banner_end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'd_banner',
  });
  return d_banner;
};