exports.up = async (knex) => {
  await knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.string('title', 127).collate('utf8_general_ci').notNullable();
    table.date('due_date').notNullable();
    table.tinyint('status', 10).notNullable();
    table.text('description');

    table.integer('job_id').unsigned().references('jobs.id').notNullable();

    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('tasks');
};
