const userService = require('../../services/user');

const getProfile = (req, res) => {
  const responseData = userService.getProfile({ userId: req.user.id });
  return res.status(200).send(responseData);
};

module.exports = getProfile;
