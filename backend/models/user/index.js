const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Novel, { foreignKey: 'user' });
      User.hasMany(models.ChapterReply, { foreignKey: 'user' });
      User.hasMany(models.Article, { foreignKey: 'user' });
      User.hasMany(models.ArticleReply, { foreignKey: 'user' });
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
