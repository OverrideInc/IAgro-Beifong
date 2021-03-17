exports.up = (knex, Promise) => (
  knex.schema.alterTable('users', (table) => {
    table.enu('user_type', null, { useNative: true, existingType: true, enumName: 'user_type_t' });

    table.integer('customer_id');
    table.foreign('customer_id').references('customers.id').onDelete('SET NULL');

    table.index('username');

    table.dropColumn('api_key');
  })
);

exports.down = (knex, Promise) => (
  knex.schema.alterTable('users', (table) => {
    table.dropColumn('user_type');

    table.dropColumn('customer_id');

    table.dropIndex('username');

    table.string('api_key');
  })
);
