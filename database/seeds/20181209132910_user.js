const bcrypt = require('bcrypt');

const SALT_ROUND = 10;

exports.seed = async (knex) => {
  await knex('users').del();
  await knex('users').insert([{
    email: 'peter.pan@amela.vn',
    password: await bcrypt.hash('123456', SALT_ROUND),
    username: 'peter-pan',
  }]);
};
