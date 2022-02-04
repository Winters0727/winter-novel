const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    static associate(models) {
      Chapter.hasMany(models.ChapterReply, { foreignKey: 'chapter' });
      Chapter.belongsTo(models.Novel, { foreignKey: 'novel' });
    }
  }
  Chapter.init(
    {
      id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Chapter',
    },
  );
  return Chapter;
};
