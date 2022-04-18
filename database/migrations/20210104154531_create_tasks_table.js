exports.up = async (knex) => {
  await knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.string('title', 127).collate('latin1_general_ci').notNullable();
    table.tinyint('status').notNullable();

    table.integer('user_id').unsigned().references('users.id').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('tasks');
};
