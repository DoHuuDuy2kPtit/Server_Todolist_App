const bcrypt = require('bcrypt');

const { User } = require('../../models');
const { abort } = require('../../helpers/error');

const SALT_ROUND = 10;

exports.getProfile = async ({ userId }) => {
  const user = await User.query()
    .findOne({ id: userId })
    .select('id', 'name', 'address', 'phone_number', 'description');

  return user;
};

exports.updateProfile = async ({
  userId, name, address, phoneNumber, description,
}) => {
  try {
    await User.query()
      .findOne({ id: userId })
      .patch({
        name,
        address,
        phone_number: phoneNumber,
        description,
      });
  } catch (error) {
    return abort(400, 'Update profile failed');
  }

  return '';
};

exports.changePassword = async ({
  userId, oldPassword, newPassword,
}) => {
  const user = await User.query()
    .findOne({ id: userId });

  if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
    return abort(400, 'Old password is incorrect');
  }

  try {
    const hashPassword = await bcrypt.hash(newPassword, SALT_ROUND);

    await user.$query().patch({
      password: hashPassword,
    });
  } catch (error) {
    return abort(400, 'Change password failed');
  }

  return '';
};