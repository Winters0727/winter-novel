const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChapterReply extends Model {
    static associate(models) {
      ChapterReply.belongsTo(models.User, { as: 'user', foreignKey: 'uuid' });
      ChapterReply.belongsTo(models.Chapter, {
        as: 'chapter',
        foreignKey: 'id',
      });
    }
  }
  ChapterReply.init(
    {
      id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      modelName: 'ChapterReply',
    },
  );
  return ChapterReply;
};
