const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArticleReply extends Model {
    static associate(models) {
      ArticleReply.belongsTo(models.User, { as: 'user', foreignKey: 'uuid' });
      ArticleReply.belongsTo(models.Article, {
        as: 'article',
        foreignKey: 'id',
      });
    }
  }
  ArticleReply.init(
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
      modelName: 'ArticleReply',
    },
  );
  return ArticleReply;
};
