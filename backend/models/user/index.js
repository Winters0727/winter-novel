const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Novel, { as: 'novels' });
      User.hasMany(models.ChapterReply, { as: 'chapterReplys' });
      User.hasMany(models.Article, { as: 'articles' });
      User.hasMany(models.ArticleReply, { as: 'articleReplys' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      userID: {
        type: DataTypes.CHAR(20),
        allowNull: false,
        unique: true,
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userNickname: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        unique: true,
      },
      userProfile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
