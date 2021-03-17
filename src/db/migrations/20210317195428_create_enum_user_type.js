exports.up = (knex, Promise) => (
  knex.raw(`
    CREATE TYPE user_type_t
    AS ENUM ('ADMIN', 'MANAGER', 'TERRA');
  `)
);

exports.down = (knex, Promise) => (
  knex.raw(`
    DROP TYPE user_type_t;
  `)
);
