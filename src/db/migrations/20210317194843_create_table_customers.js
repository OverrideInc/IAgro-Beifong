exports.up = (knex, Promise) => (
  knex.schema.createTable('customers', (table) => {
    table.increments();

    table.string('name');
    table.string('email').unique().notNullable();

    table.timestamps(false, true);
  })
);

exports.down = (knex, Promise) => (
  knex.schema.dropTable('customers')
);
