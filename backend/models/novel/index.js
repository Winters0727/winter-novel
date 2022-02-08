const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Novel extends Model {
    static associate(models) {
      Novel.hasMany(models.Chapter, { foreignKey: 'novel' });
      Novel.belongsTo(models.User, { foreignKey: 'user' });
    }
  }
  Novel.init(
    {
      id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userNickname: {
        type: DataTypes.CHAR(10),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      illustration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Novel',
    },
  );
  return Novel;
};
