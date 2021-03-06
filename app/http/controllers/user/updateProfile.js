const Joi = require('joi');

const { abort } = require('../../../helpers/error');
const userService = require('../../services/user');

const validate = async (params) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string().max(127),
    address: Joi.string().max(127),
    phoneNumber: Joi.string().max(127),
    description: Joi.string().max(127),
  });
  try {
    await schema.validateAsync(params);
  } catch (error) {
    abort(400, 'Params Error');
  }
};

const updateProfile = async (req, res) => {
  const params = {
    email: req.body.email,
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phone_number,
    description: req.body.description,
  };
  await validate(params);
  await userService.updateProfile({ ...params, userId: req.user.id });
  return res.status(201).send({
    message: 'success',
  });
};

module.exports = updateProfile;
