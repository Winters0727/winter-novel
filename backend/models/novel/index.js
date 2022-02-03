const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Novel extends Model {
    static associate(models) {
      Novel.hasMany(models.Chapter, { as: 'chapters' });
      Novel.belongsTo(models.User, { as: 'user', foreignKey: 'uuid' });
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Novel',
    },
  );
  return Novel;
};
