const { Op } = require('sequelize');

const { Novel, Chapter } = require('@/models');

exports.post = async payload => {
  try {
    const data = await Novel.create(payload);
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.get = async query => {
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

exports.getByKeyword = async keyword => {
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

exports.getByID = async id => {
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

exports.update = async (id, payload) => {
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

exports.delete = async id => {
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
