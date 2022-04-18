const bcrypt = require('bcrypt');

const { generate } = require('../../helpers/jwt');
const { User } = require('../../models');
const { abort } = require('../../helpers/error');

const SALT_ROUND = 10;

exports.signIn = async ({ username, password }) => {
  const user = await User.query()
    .findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return abort(400, 'Email or password is incorrect');
  }
  const accessToken = await generate({ userId: user.id });
  return { accessToken };
};

exports.signUp = async ({ email, password, username }) => {
  const hashPassword = await bcrypt.hash(password, SALT_ROUND);

  if (await User.hasEmail(email)) {
    return abort(400, 'Email existed');
  }

  try {
    await User.query().insert({
      email,
      password: hashPassword,
      username,
      task_count: 0,
    });
    return '';
  } catch (error) {
    return abort(400, 'Sign up failed');
  }
};
