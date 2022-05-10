exports.up = async (knex) => {
  await knex.schema.table('tasks', (table) => {
    table.string('time', 127).collate('utf8_general_ci').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.table('tasks', (table) => {
    table.dropColumn('time');
  });
};
