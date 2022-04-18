const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const auth = require('../../services/auth');

const validate = async (params) => {
  const schema = Joi.object({
    email: Joi.string().email().max(127).required(),
    username: Joi.string().min(3).max(127).required(),
    password: Joi.string().min(6).max(127).required(),
    confirmPassword: Joi.valid(Joi.ref('password')).required(),
  });
  try {
    await schema.validateAsync(params);
  } catch (error) {
    abort(400, 'Params Error');
  }
};

const signUp = async (req, res) => {
  const params = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };
  await validate(params, res);
  await auth.signUp(params);
  return res.status(201).send({
    message: 'success',
  });
};

module.exports = signUp;
