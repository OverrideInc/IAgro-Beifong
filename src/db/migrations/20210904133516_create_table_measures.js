exports.up = (knex, Promise) => (
  knex.schema.createTable('measures', (table) => {
    table.increments();
    table
      .enu('status', null, { useNative: true, existingType: true, enumName: 'measure_status_t' })
      .defaultTo('NEW');
    table.json('payload');

    table.timestamps(false, true);
  })
);

exports.down = (knex, Promise) => (
  knex.schema.dropTable('measures')
);
