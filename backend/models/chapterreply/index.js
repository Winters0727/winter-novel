const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChapterReply extends Model {
    static associate(models) {
      ChapterReply.belongsTo(models.User, { foreignKey: 'user' });
      ChapterReply.belongsTo(models.Chapter, { foreignKey: 'chapter' });
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
      userNickname: {
        type: DataTypes.CHAR(10),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
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
