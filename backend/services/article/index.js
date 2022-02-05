const { Op } = require('sequelize');

const { Article } = require('@/models');

exports.postArticle = async payload => {
  try {
    const data = await Article.create(payload);
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.getArticles = async query => {
  try {
    const data = await Article.findAll({
      where: {
        ...query,
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.getArticlesByKeyword = async keyword => {
  try {
    const data = await Article.findAll({
      where: {
        [Op.substring]: keyword,
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.getArticleByID = async id => {
  try {
    const data = await Article.findOne({
      where: {
        id,
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.updateArticle = async (id, payload) => {
  try {
    const data = await Article.findOne({
      where: {
        id,
      },
    });
    await data.update(payload);
    await data.save();
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.deleteArticle = async id => {
  try {
    const data = await Article.findOne({
      where: {
        id,
      },
    });
    if (data) {
      await data.destroy();
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw Error(err);
  }
};
