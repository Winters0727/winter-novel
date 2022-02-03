const { User } = require('@/models');

exports.postUser = async payload => {
  try {
    const data = await User.create(payload);
    return data;
  } catch (err) {
    throw Error(err);
  }
};

exports.getUsers = async query => {
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

exports.getUser = async id => {
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

exports.updateUser = async (id, payload) => {
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

exports.deleteUser = async id => {
  try {
    const data = await User.findOne({
      where: {
        id,
      },
    });
    await data.destroy();
    return true;
  } catch (err) {
    throw Error(err);
  }
};
