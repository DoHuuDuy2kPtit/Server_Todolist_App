exports.up = async (knex) => {
  await knex.schema.createTable('jobs', (table) => {
    table.increments('id');
    table.string('title', 127).collate('utf8_general_ci').notNullable();

    table.integer('user_id').unsigned().references('users.id').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('tasks');
};
