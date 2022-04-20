exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email', 127).collate('latin1_general_ci');
    table.string('password', 127).collate('latin1_general_ci');
    table.string('username', 127).collate('utf8_general_ci');
    table.string('name', 127).collate('utf8_general_ci');
    table.string('address', 127).collate('utf8_general_ci');
    table.string('phone_number', 127).collate('latin1_general_ci');
    table.text('avatar_url').collate('latin1_general_ci');
    table.text('description').collate('utf8_general_ci');

    table.timestamps(true, true);

    table.unique(['email'], 'email');
    table.unique(['username'], 'username');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
