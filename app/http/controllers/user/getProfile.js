const userService = require('../../services/user');

const getProfile = async (req, res) => {
  const responseData = await userService.getProfile({ userId: req.user.id });
  return res.status(200).send(responseData);
};

module.exports = getProfile;
