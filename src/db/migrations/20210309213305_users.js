exports.up = (knex, Promise) => (
  knex.schema.createTable('users', (table) => {
    table.increments();

    table.string('app_name');
    table.string('api_key');
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(false, true);
  })
);

exports.down = (knex, Promise) => (
  knex.schema.dropTable('users')
);
