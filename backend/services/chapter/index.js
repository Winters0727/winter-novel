const { Op } = require('sequelize');

const { Chapter, ChapterReply } = require('@/models');

exports.postChapter = async payload => {
  try {
    const data = await Chapter.create(payload);
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.getChapters = async query => {
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

exports.getChapterByID = async id => {
  try {
    const data = await Chapter.findOne({
      where: {
        id,
      },
      include: { model: ChapterReply, attributes: ['id', 'user', 'content'] },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.updateChapter = async (id, payload) => {
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

exports.deleteChapter = async id => {
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
