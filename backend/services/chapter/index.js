const { Op } = require('sequelize');

const { Chapter, ChapterReply } = require('@/models');

exports.post = async payload => {
  try {
    const data = await Chapter.create(payload);
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.get = async query => {
  try {
    const data = await Chapter.findAll({
      where: {
        ...query,
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.getByID = async id => {
  try {
    const data = await Chapter.findOne({
      where: {
        id,
      },
      include: {
        model: ChapterReply,
        attributes: ['id', 'user', 'nickname', 'content'],
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.update = async (id, payload) => {
  try {
    const data = await Chapter.findOne({
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
    const data = await Chapter.findOne({
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
