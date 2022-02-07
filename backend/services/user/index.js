const { User } = require('@/models');

exports.post = async payload => {
  try {
    const data = await User.create(payload);
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.get = async query => {
  try {
    const data = await User.findAll({
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
    const data = await User.findOne({
      where: {
        id,
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.getByUserID = async userID => {
  try {
    const data = await User.findOne({
      where: {
        userID,
      },
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.update = async (id, payload) => {
  try {
    const data = await User.findOne({
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
    const data = await User.findOne({
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
