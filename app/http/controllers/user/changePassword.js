const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const userService = require('../../services/user');

const validate = async (params) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(127).required(),
    newPassword: Joi.string().min(6).max(127).required(),
  });
  try {
    await schema.validateAsync(params);
  } catch (error) {
    abort(400, 'Params Error');
  }
};

const changePassword = async (req, res) => {
  const params = {
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
  };
  await validate(params);
  await userService.changePassword({ ...params, userId: req.user.id });
  return res.status(201).send({
    message: 'success',
  });
};

module.exports = changePassword;
