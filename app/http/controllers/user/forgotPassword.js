const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const userService = require('../../services/user');

const validate = async (params) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).max(127).required(),
  });
  try {
    await schema.validateAsync(params);
  } catch (error) {
    abort(400, 'Params Error');
  }
};

const forgotPassword = async (req, res) => {
  const params = {
    username: req.body.username,
    password: req.body.password,
  };
  await validate(params);
  await userService.forgotPassword({ ...params });
  return res.status(200).send({
    message: 'success',
  });
};

module.exports = forgotPassword;
