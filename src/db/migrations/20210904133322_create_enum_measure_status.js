exports.up = (knex, Promise) => (
  knex.raw(`
    CREATE TYPE measure_status_t
    AS ENUM ('NEW', 'PROCESSING', 'PROCESSED');
  `)
);

exports.down = (knex, Promise) => (
  knex.raw(`
    DROP TYPE measure_status_t;
  `)
);
