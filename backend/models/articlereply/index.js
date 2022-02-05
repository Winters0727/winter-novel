const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArticleReply extends Model {
    static associate(models) {
      ArticleReply.belongsTo(models.User, { foreignKey: 'user' });
      ArticleReply.belongsTo(models.Article, { foreignKey: 'article' });
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
    },
    {
      sequelize,
      modelName: 'ArticleReply',
    },
  );
  return ArticleReply;
};
