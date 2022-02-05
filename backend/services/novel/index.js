const { Op } = require('sequelize');

const { Novel, Chapter } = require('@/models');

exports.postNovel = async payload => {
  try {
    const data = await Novel.create(payload);
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.getNovels = async query => {
  try {
    const data = await Novel.findAll({
      where: {
        ...query,
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.getNovelsByKeyword = async keyword => {
  try {
    const data = await Novel.findAll({
      where: {
        [Op.substring]: keyword,
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.getNovelByID = async id => {
  try {
    const data = await Novel.findOne({
      where: {
        id,
      },
      include: {
        model: Chapter,
        attributes: ['id', 'order', 'title'],
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.updateNovel = async (id, payload) => {
  try {
    const data = await Novel.findOne({
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

exports.deleteNovel = async id => {
  try {
    const data = await Novel.findOne({
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
