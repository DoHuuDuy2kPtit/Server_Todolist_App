const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const auth = require('../../services/auth');

const validate = async (params, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().max(127).required(),
      password: Joi.string().min(6).max(127).required(),
    });

    return await schema.validate(params);
  } catch (error) {
    return res.status(400).send({
      message: 'Params error',
    });
  }
};

const signIn = async (req, res) => {
  const params = {
    username: req.body.username,
    password: req.body.password,
  };
  await validate(params);
  const result = await auth.signIn(params, res);
  return res.status(200).send(result);
};

module.exports = signIn;
